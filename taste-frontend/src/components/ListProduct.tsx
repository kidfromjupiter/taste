import { AnimationControls, m } from "framer-motion";
import React from "react";
import RippleCard from "./RippleCard";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import SpringContainer from "./SpringSquare";

type Props = {
	name?: string;
	id?: string;
	img?: string;
	price?: number;
	category?: string;
	borderStyles: AnimationControls;
};

const ListProduct = ({
	name = "Turmeric Powder",
	id = "00000",
	img = "https://picsum.com/200/200/",
	price = 730,
	category = "Daily Essentials",
	borderStyles,
}: Props) => {
	return (
		<RippleCard onClickAction={() => {}}>
			<div className="flex border-b-gray-50 border-b-2 px-3 items-center">
				<div className="relative flex justify-center items-center mr-5">
					<div
						style={{ backgroundImage: `url(${"/spicebottle.png"})` }}
						className=" h-24 w-24 bg-cover bg-center my-6 z-10"
					></div>
					<m.span
						animate={borderStyles}
						className="w-28 h-28 m-auto bg-slate-100 absolute"
					></m.span>
				</div>
				<div className="flex flex-col py-3 w-full">
					<div className="flex flex-col">
						<div className="font-semibold text-lg">{name}</div>
						<div className="text-sm text-slate-400 font-medium">{category}</div>
						<div className="font-semibold">{price}Rs</div>
					</div>
					<div
						className="flex pt-5 justify-end"
						onClick={(e) => e.stopPropagation()}
					>
						<SpringContainer
							className="bg-gray-200 text-slate-700 rounded-md py-2 px-2 mx-2"
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
							className="bg-gray-200 text-slate-700 rounded-md py-2 px-2 mx-2"
							childrenHolderClassName=""
							mouseDown={{ scale: 0.85 }}
							touchStart={{ scale: 0.85 }}
						>
							<HiOutlinePlus size={32} />
						</SpringContainer>
					</div>
				</div>
			</div>
		</RippleCard>
	);
};

export default ListProduct;
