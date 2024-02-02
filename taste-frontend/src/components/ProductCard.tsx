import React, { useEffect, useRef } from "react";
import SpringContainer from "./SpringSquare";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { BsCart } from "react-icons/bs";
import { AnimationControls, m, useInView } from "framer-motion";
import useBorderRadiusBlob from "./hooks/useBorderRadiusBlob";
import { Product } from "@/app/types";
import { addToCart } from "@/aux/fetch/authenticated_apis";

const ProductCard = ({ image, name, domestic_price, domestic_price_currency, id }: Product) => {
	const [blobStyles, _, __, ref] = useBorderRadiusBlob();

	return (
		<div className="flex relative select-none lg:cursor-pointer rounded-md bg-gray-50 border-slate-100 border-2 shadow-md shadow-gray-100 flex-col justify-center items-center dark:bg-neutral-800 dark:shadow-zinc-800 dark:border-neutral-800">
			<div className="absolute top-2 right-2 z-20 dark:text-neutral-300">
				<BsCart size={30} />
				<div className="absolute top-0 right-0 rounded-full bg-emerald-800 text-white text-sm flex justify-center items-center">
					10
				</div>
			</div>
			<div className="relative flex justify-center items-center" ref={ref}>
				<div
					style={{ backgroundImage: `url(${image})` }}
					className=" h-28 w-28 bg-cover bg-center my-6 z-10"
				></div>
				<m.span
					className="w-36 h-36 m-auto bg-slate-100 absolute"
					animate={blobStyles}
				></m.span>
			</div>
			<div className="dark:text-gray-50">
				<div className="font-medium text-lg">{name}</div>
				<div className=" font-light">{parseFloat(domestic_price).toFixed(2)} {domestic_price_currency}</div>
			</div>
			<div className="my-3">
				<div className="text-gray-500 text-sm text-center">
					Add 100g to cart
				</div>
				<div className="flex flex-row justify-center items-center mt-2">
					<SpringContainer
						className="bg-gray-200 text-slate-700 rounded-full shadow-lg p-2 mx-2 dark:shadow-zinc-700 dark:bg-neutral-600 dark:text-gray-50"
						childrenHolderClassName=""
						mouseDown={{ scale: 0.85 }}
						touchStart={{ scale: 0.85 }}
					>
						<HiOutlineMinus size={32} />
					</SpringContainer>
					<SpringContainer
						className="bg-gray-200 text-slate-700 rounded-full shadow-lg p-2 mx-2 dark:shadow-zinc-700 dark:bg-neutral-600 dark:text-gray-50"
						childrenHolderClassName=""
						mouseDown={{ scale: 0.85 }}
						touchStart={{ scale: 0.85 }}
						touchEndCallback={() => { addToCart(id) }}
					>
						<HiOutlinePlus size={32} />
					</SpringContainer>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
