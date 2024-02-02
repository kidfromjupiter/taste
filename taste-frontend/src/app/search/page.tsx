"use client";

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, { useRef, useState, useEffect, use } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/aux/fetch/apis";
type Props = {};
import { Product, Response } from "../types";

const SearchPage = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	//detecting viewport entry of last list item
	const [listView, setListView] = useState(false);

	//loading more products animation
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState<Response | null>(null);

	const router = useRouter();

	//searching
	const searchParams = useSearchParams();

	useEffect(() => {

		searchProducts(searchParams.get("query") || "").then((res) => {
			setLoading(true);
			setResponse(res);
			setLoading(false);
		});

	}, [searchParams.get("query")])

	const loadNextPage = () => {
		setLoading(true);
		if (response) {
			fetch(response.next).then((res) => {
				res.json().then((data) => {
					setResponse({ count: response.count + data.count, next: data.next, previous: data.previous, results: [...response.results, ...data.results] })
					setLoading(false);
				})

			}
			)
		}
	}

	return (
		<FramerWrapper>
			<div className="h-full relative dark:bg-neutral-900">
				<div
					className="z-20 flex w-full px-3 bg-white  flex-col items-start mb-3 dark:bg-neutral-900"
					ref={ref}
				>
					<SearchBar
						onEnter={(searchtext) => {
							router.push(`/search?query=${searchtext}`)
						}}
						value={searchParams.get("query") || ""}
						className=" bg-gray-100 placeholder-slate-400 outline-none ring-0 rounded-full w-full px-10 py-3 mt-3 dark:bg-neutral-700 dark:text-zinc-300" />
					<div className="flex rounded-full bg-slate-100 my-3 dark:bg-neutral-700 dark:text-gray-50">
						<div
							className={`py-2 px-3 rounded-full ${listView ? "bg-slate-200 dark:bg-zinc-600" : ""
								}`}
							onClick={() => setListView(true)}
						>
							<AiOutlineUnorderedList size={34} />
						</div>
						<div
							className={`py-2 px-3 rounded-full ${!listView ? "bg-slate-200 dark:bg-zinc-600" : ""
								}`}
							onClick={() => setListView(false)}
						>
							<AiOutlineAppstore size={34} />
						</div>
					</div>
				</div>
				<div
					className={`w-full grid-flow-row ${response && response.results.length > 0 ? 'grid-cols-2' : ''} gap-3 px-3  h-full overflow-auto mb-5 `}
					style={{ display: listView ? "block" : "grid" }}
					ref={ref}
				>
					{response ?
						response.results.length > 0 ? response.results.map((p: Product, i: number) => {
							return listView ?
								<ListProduct
									key={i}
									{...p}

								/>
								: <ProductCard
									key={i}
									{...p}

								/>
						}) : <div className=" flex justify-center flex-col items-center">
							<div className=" text-center p-3">Looks like your search didn't return any products</div>
							<div className=" text-center p-3 dark:text-neutral-500 text-neutral-400">Try searching for something else</div>
							<div
								className="w-60 h-60 p-10 bg-center bg-cover"
								style={{ backgroundImage: `url('${"/confused_bear.png"}')` }}
							></div>

						</div> : null}
				</div>
				{response && response.next && response.results.length > 0 ? <SpringContainer
					className=""
					childrenHolderClassName="bg-black h-20 w-full text-white flex justify-center items-center"
					touchEndCallback={loadNextPage}
					enableHover={false}
				>
					<h3>Tap to load more</h3>
				</SpringContainer> : null}

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
export default SearchPage;
