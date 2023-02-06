"use client";

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, { useRef, useState, useEffect } from "react";
import { useSpring, animated, useSpringRef } from "@react-spring/web";
import { BsArrowUp } from "react-icons/bs";
import FramerWrapper from "@/components/FramerWrapper";
import { AiOutlineLoading } from "react-icons/ai";
import {
	m,
	motion,
	useDragControls,
	useScroll,
	useMotionValueEvent,
	useMotionValue,
	useTransform,
	useSpring as framerSpring,
	AnimatePresence,
	useTime,
	useAnimationControls,
} from "framer-motion";
type Props = {};

const ExplorePage = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	//detecting viewport entry of last list item
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const bottomIntersectionDiv = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (bottomIntersectionDiv.current) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setBottom(true);
					}
				},
				{
					root: scrollContainerRef.current,
				}
			);
			observer.observe(bottomIntersectionDiv.current);
		}
	}, []);
	const [loading, setLoading] = useState(false);
	const [bottom, setBottom] = useState(false);
	const [textShown, setTextShown] = useState(true);
	const scrollYValue = useMotionValue(0);
	const translateY = framerSpring(0, {
		stiffness: 300,
		damping: 40,
	});
	//animating blobs
	const borderRadiusBlobControls = useAnimationControls();
	useEffect(() => {
		borderRadiusBlobControls.start({
			borderRadius: [
				"33% 67% 70% 30% / 30% 30% 70% 70%",
				"37% 63% 51% 49% / 37% 65% 35% 63%",
				"36% 64% 64% 36% / 64% 48% 52% 36%",
				"37% 63% 51% 49% / 30% 30% 70% 70%",
				"40% 60% 42% 58% / 41% 51% 49% 59%",
				"33% 67% 70% 30% / 30% 30% 70% 70%",
			],
			transform: ["rotateY(0deg)", "rotateY(10deg)"],

			transition: {
				duration: 30,
				repeat: Infinity,
				repeatType: "loop",
				ease: "easeInOut",
			},
		});
	}, []);

	//drag to load more animations
	const dragProgress = useMotionValue(0);
	const animatedColor = useTransform(
		dragProgress,
		[0, -200, -250],
		["#000000", "#059669", "#d97706"]
	);
	const { scrollY } = useScroll({
		container: scrollContainerRef,
		axis: "y",
	});
	useMotionValueEvent(dragProgress, "change", (latest) => {
		if (latest < -200) {
			setTextShown(false);
			setLoading(true);
		}
	});
	useEffect(() => {
		if (loading == true) {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, [loading]);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (scrollYValue.get() == 0) {
			scrollYValue.set(100);
		}
		if (latest > scrollYValue.get()) {
			//SCROLLING DOWN
			translateY.set(100);
		} else {
			//SCROLLING UP
			setBottom(false);
			setTextShown(true);
			translateY.set(0);
		}
		//check if scroll is at bottom

		scrollYValue.set(latest);
	});

	return (
		<FramerWrapper>
			<m.div className="h-screen relative">
				<m.div
					style={{
						translateY: useTransform(translateY, [0, 100], ["0%", "-100%"]),
					}}
					className=" absolute z-20 flex w-full px-3 bg-white py-5 shadow-md"
					ref={ref}
				>
					<SearchBar className=" bg-gray-100 placeholder-slate-400 outline-none ring-0 rounded-full w-full px-10 py-3" />
				</m.div>
				<m.div
					className="w-full grid-flow-row grid-cols-2 grid gap-3 px-3 pb-16 pt-24 h-full overflow-auto "
					ref={scrollContainerRef}
				>
					{Array.from({ length: 10 }).map((_, i) => {
						if (i == 9) {
							return (
								<div key={i} ref={bottomIntersectionDiv}>
									<ProductCard borderStyles={borderRadiusBlobControls} />
								</div>
							);
						}
						return (
							<ProductCard key={i} borderStyles={borderRadiusBlobControls} />
						);
					})}
				</m.div>
			</m.div>
			<AnimatePresence>
				{bottom ? (
					<motion.div
						className="absolute bottom-0 right-0 px-16  touch-none text-white justify-center items-center w-full flex z-50"
						onDrag={(event, info) => {
							dragProgress.set(info.offset.y);
							if (info.offset.y < -200) {
								setLoading(true);
							}
						}}
						onDragEnd={() => dragProgress.set(0)}
						drag="y"
						dragSnapToOrigin={true}
						dragElastic={0.5}
						dragConstraints={{ top: 0 }}
						dragPropagation={true}
						exit={{ opacity: 0, translateY: 100 }}
						initial={{ opacity: 0, translateY: 100 }}
						animate={{
							opacity: 1,
							transition: { duration: 0.5 },
							translateY: 0,
						}}
					>
						<motion.div
							style={{
								backgroundColor: animatedColor,
							}}
							className=" flex p-3 items-center"
						>
							<AnimatePresence>
								{textShown ? (
									<motion.div
										className="w-full items-center px-2"
										exit={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										initial={{ opacity: 0 }}
									>
										Drag up to load more
									</motion.div>
								) : null}
							</AnimatePresence>
							<AnimatePresence>
								{!loading ? (
									<motion.div
										exit={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										initial={{ opacity: 0 }}
									>
										<BsArrowUp className="text-white text-3xl" />
									</motion.div>
								) : (
									<motion.div
										exit={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										initial={{ opacity: 0 }}
									>
										<AiOutlineLoading className="text-white text-3xl animate-spin" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</FramerWrapper>
	);
};
export default ExplorePage;
