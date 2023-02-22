import { AnimationControls, m, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import RippleCard from "./RippleCard";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import SpringContainer from "./SpringSquare";
import useBorderRadiusBlob from "./hooks/useBorderRadiusBlob";

type Props = {
	name?: string;
	id?: string;
	img?: string;
	price?: number;
	category?: string;
	removeItem?: (itemId: string) => void;
	simplified?: boolean;
};

const ListProduct = ({
	name = "Turmeric Powder",
	id = "00000",
	img = "https://picsum.com/200/200/",
	price = 730,
	category = "Daily Essentials",
	removeItem,
	simplified = false,
}: Props) => {
	const [blobStyles, _, __, ref] = useBorderRadiusBlob();

	return (
		// <RippleCard onClickAction={() => {}}>
		<div className="flex border-b-gray-50 dark:border-neutral-800 border-b-2 px-3 items-center">
			<div className="relative flex justify-center items-center mr-5" ref={ref}>
				<div
					style={{ backgroundImage: `url(${"/spicebottle.png"})` }}
					className=" h-24 w-24 bg-cover bg-center my-6 z-10"
				></div>
				<m.span
					animate={blobStyles}
					className="w-28 h-28 m-auto bg-slate-100 absolute"
				></m.span>
			</div>
			<div className="flex flex-col py-3 w-full dark:text-gray-50">
				<div className="flex flex-col relative">
					<div className="font-semibold text-lg">{name}</div>
					<div className="text-sm text-slate-400 font-medium">{category}</div>
					<div className="font-semibold">{price}Rs</div>
					{removeItem && (
						<div
							className="absolute top-0 right-0"
							onClick={() => removeItem(id)}
						>
							<AiOutlineDelete size={30} />
						</div>
					)}
				</div>
				{!simplified && (
					<div
						className="flex pt-5 justify-end"
						onClick={(e) => e.stopPropagation()}
					>
						<SpringContainer
							className="bg-gray-200 text-slate-700 rounded-md py-2 px-2 mx-2 dark:bg-neutral-600 dark:text-gray-50 "
							childrenHolderClassName=""
							mouseDown={{ scale: 0.85 }}
							touchStart={{ scale: 0.85 }}
						>
							<HiOutlineMinus size={32} />
						</SpringContainer>
						<div className="text-white bg-emerald-700 rounded-md py-2 px-5 flex justify-center items-center ">
							<div>300g</div>
						</div>
						<SpringContainer
							className="bg-gray-200 text-slate-700 rounded-md py-2 px-2 mx-2 dark:bg-neutral-600 dark:text-gray-50 "
							childrenHolderClassName=""
							mouseDown={{ scale: 0.85 }}
							touchStart={{ scale: 0.85 }}
						>
							<HiOutlinePlus size={32} />
						</SpringContainer>
					</div>
				)}
			</div>
		</div>
		// </RippleCard>
	);
};

export default ListProduct;
