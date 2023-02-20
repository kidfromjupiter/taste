"use client";
import ListProduct from "@/components/ListProduct";
import React, { useEffect, useRef } from "react";
import {
	useAnimationControls,
	useMotionValue,
	useSpring,
	motion,
	useInView,
} from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import SpringContainer from "@/components/SpringSquare";

type Props = {};

const Cart = (props: Props) => {
	const borderRadiusBlobControls = useAnimationControls();
	const translate = useMotionValue(0);
	const rotate = useMotionValue(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref);
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
	useEffect(() => {
		if (isInView) {
			translate.set(200);
			rotate.set(180);
		} else {
			translate.set(0);
			rotate.set(0);
		}
	}, [isInView]);

	const translate_rotate = () => {
		if (translate.get() == 0) {
			translate.set(200);
			rotate.set(180);
		} else {
			translate.set(0);
			rotate.set(0);
		}
	};
	const translateStyle = useSpring(translate, {
		stiffness: 150,
		damping: 20,
	});
	const rotateStyle = useSpring(rotate, {
		// stiffness: 300,
		// damping: 30,
	});

	return (
		<div className="">
			<motion.div className="grid grid-flow-row gap-4 mb-10">
				{Array.from({ length: 10 }).map((_, i) => {
					if (i == 9) {
						return (
							<div key={i} ref={ref}>
								<ListProduct
									borderStyles={borderRadiusBlobControls}
									removeItem={() => console.log("remove item")}
								/>
							</div>
						);
					}
					return (
						<ListProduct
							key={i}
							borderStyles={borderRadiusBlobControls}
							removeItem={() => console.log("remove item")}
						/>
					);
				})}
			</motion.div>
			<motion.div
				className="fixed w-full h-60 bg-white shadow-top bottom-0 z-50"
				style={{ translateY: translateStyle }}
			>
				<div
					className="flex justify-center items-center text-slate-500 pt-2"
					onPointerDown={translate_rotate}
				>
					<motion.div style={{ rotate: rotateStyle }}>
						<BsChevronDown size={27} />
					</motion.div>
				</div>
				<div className="pb-10 pt-3 px-5">
					<div className="w-full flex flex-col justify-center">
						<div className="pb-3 border-b-slate-200 border-b-2">
							<div className="flex justify-between pb-2">
								<div>Subtotal items (2)</div>
								<div>2400Rs</div>
							</div>
							<div className="flex justify-between ">
								<div>Delivery fee</div>
								<div>165Rs</div>
							</div>
						</div>
						<div className="pt-2">
							<div className="flex justify-between font-semibold">
								<div>Total</div>
								<div>2565Rs</div>
							</div>
						</div>
					</div>
					<SpringContainer
						className=""
						childrenHolderClassName="text-white from-emerald-500 to-sky-500 bg-gradient-to-tr py-3 text-center mt-4 font-semibold rounded-sm"
					>
						Proceed to checkout
					</SpringContainer>
				</div>
			</motion.div>
		</div>
	);
};

export default Cart;
