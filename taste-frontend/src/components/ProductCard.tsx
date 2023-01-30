import React, { useRef, useEffect, MouseEvent } from "react";
import SpringContainer from "./SpringSquare";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { BsCart } from "react-icons/bs";
type Props = {};

const ProductCard = (props: Props) => {
	return (
		<div className="flex relative select-none lg:cursor-pointer rounded-md bg-gray-50 border-slate-100 border-2 shadow-md shadow-gray-100 flex-col justify-center items-center">
			<div className="absolute top-2 right-2">
				<BsCart size={30} />
				<div className="absolute top-0 right-0 rounded-full bg-emerald-800 text-white text-sm w-4 h-4 flex justify-center items-center">
					1
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${"/spicebottle.png"})` }}
				className=" h-28 w-28 bg-cover bg-center my-6"
			></div>
			<div>
				<div className="font-medium text-lg">Turmeric Powder</div>
				<div className=" font-light">780Rs</div>
			</div>
			<div className="my-3">
				<div className="text-gray-500 text-sm text-center">
					Add 100g to cart
				</div>
				<div className="flex flex-row justify-center items-center mt-2">
					<SpringContainer
						className="bg-gray-200 text-slate-700 rounded-full shadow-lg p-2 mx-2"
						childrenHolderClassName=""
						mouseDown={{ scale: 0.85 }}
						touchStart={{ scale: 0.85 }}
					>
						<HiOutlineMinus size={32} />
					</SpringContainer>
					<SpringContainer
						className="bg-gray-200 text-slate-700 rounded-full shadow-lg p-2 mx-2"
						childrenHolderClassName=""
						mouseDown={{ scale: 0.85 }}
						touchStart={{ scale: 0.85 }}
					>
						<HiOutlinePlus size={32} />
					</SpringContainer>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
