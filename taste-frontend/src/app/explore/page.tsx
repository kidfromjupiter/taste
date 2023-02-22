"use client";

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, { useRef, useState, useEffect } from "react";
import FramerWrapper from "@/components/FramerWrapper";
import {
	AiOutlineLoading,
	AiOutlineUnorderedList,
	AiOutlineAppstore,
} from "react-icons/ai";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import ListProduct from "@/components/ListProduct";
import SpringContainer from "@/components/SpringSquare";
import useBorderRadiusBlob from "@/components/hooks/useBorderRadiusBlob";
type Props = {};

const ExplorePage = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	//detecting viewport entry of last list item
	const [listView, setListView] = useState(false);
	const [loading, setLoading] = useState(false);
	//animating blobs

	//drag to load more animations
	useEffect(() => {
		if (loading == true) {
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
	}, [loading]);

	return (
		<FramerWrapper>
			<div className="h-full relative dark:bg-neutral-900">
				<div
					className="z-20 flex w-full px-3 bg-white  flex-col items-start mb-3 dark:bg-neutral-900"
					ref={ref}
				>
					<SearchBar className=" bg-gray-100 placeholder-slate-400 outline-none ring-0 rounded-full w-full px-10 py-3 mt-3 dark:bg-neutral-700 dark:text-zinc-300" />
					<div className="flex rounded-full bg-slate-100 my-3 dark:bg-neutral-700 dark:text-gray-50">
						<div
							className={`py-2 px-3 rounded-full ${
								listView ? "bg-slate-200 dark:bg-zinc-600" : ""
							}`}
							onClick={() => setListView(true)}
						>
							<AiOutlineUnorderedList size={34} />
						</div>
						<div
							className={`py-2 px-3 rounded-full ${
								!listView ? "bg-slate-200 dark:bg-zinc-600" : ""
							}`}
							onClick={() => setListView(false)}
						>
							<AiOutlineAppstore size={34} />
						</div>
					</div>
				</div>
				<div
					className="w-full grid-flow-row grid-cols-2 gap-3 px-3  h-full overflow-auto mb-5 "
					style={{ display: listView ? "block" : "grid" }}
					ref={ref}
				>
					{Array.from({ length: 20 }).map((_, i) => {
						return listView ? <ListProduct key={i} /> : <ProductCard key={i} />;
					})}
				</div>
				<SpringContainer
					className=""
					childrenHolderClassName="bg-black h-20 w-full text-white flex justify-center items-center"
					touchEndCallback={() => setLoading(true)}
					enableHover={false}
				>
					<h3>Tap to load more</h3>
				</SpringContainer>
				<AnimatePresence>
					{loading ? (
						<motion.div
							initial={{ scale: 0 }}
							exit={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="flex justify-center items-center"
						>
							<motion.div
								animate={{
									scale: [1, 2, 2, 1, 1],
									rotate: [0, 0, 270, 270, 0],
									borderRadius: ["20%", "20%", "50%", "50%", "20%"],
								}}
								transition={{
									duration: 1.5,
									ease: "easeInOut",
									repeat: Infinity,
									repeatType: "loop",
								}}
								className="h-12 w-12 bg-emerald-500 bottom-20 m-auto absolute z-50 flex justify-center items-center"
							>
								<AiOutlineLoading className="text-white text-3xl animate-spin" />
							</motion.div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</FramerWrapper>
	);
};
export default ExplorePage;
