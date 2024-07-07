import React from "react";
import SpringContainer from "./SpringSquare";
import { m, AnimationControls } from "framer-motion";
import useBorderRadiusBlob from "./hooks/useBorderRadiusBlob";
type Props = {
	url?: string;
	title?: string;
	price?: number;
	imgUrl?: string;
};

const SimpleProductCard = ({ url, title, price, imgUrl }: Props) => {
	const [borderStyles, _, __, ref] = useBorderRadiusBlob();
	return (
		<SpringContainer
			className="bg-gray-50 rounded-md lg:cursor-pointer shadow-md shadow-gray-100 border-slate-100 border-2 dark:bg-neutral-800 dark:text-gray-50 dark:border-neutral-800 dark:shadow-neutral-900"
			childrenHolderClassName="p-3 flex flex-col justify-center items-center"
		>
			<div className="relative flex justify-center items-center" ref={ref}>
				<div
					style={{ backgroundImage: `url(${"/spicebottle.png"})` }}
					className=" h-28 w-28 bg-cover bg-center my-6 z-10"
				></div>
				<m.span
					animate={borderStyles}
					// style={{ 	borderaRadius: "30% 70% 70% 30% / 30% 52% 48% 70%" }}
					className="w-36 h-36 m-auto bg-slate-100 absolute dark:bg-neutral-200"
				></m.span>
			</div>
			<div>
				<div className="font-medium text-lg">Turmeric Powder</div>
				<div className=" font-light">780Rs</div>
			</div>
		</SpringContainer>
	);
};

export default SimpleProductCard;
