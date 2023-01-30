import React from "react";
import SpringContainer from "./SpringSquare";

type Props = {
	url?: string;
	title?: string;
	price?: number;
	imgUrl?: string;
};

const SimpleProductCard = ({ url, title, price, imgUrl }: Props) => {
	return (
		<SpringContainer
			className="bg-gray-50 rounded-md lg:cursor-pointer shadow-md shadow-gray-100 border-slate-100 border-2"
			childrenHolderClassName="p-3 flex flex-col justify-center items-center"
		>
			<div
				style={{ backgroundImage: `url(${"/spicebottle.png"})` }}
				className=" h-28 w-28 bg-cover bg-center my-6"
			></div>
			<div>
				<div className="font-medium text-lg">Turmeric Powder</div>
				<div className=" font-light">780Rs</div>
			</div>
		</SpringContainer>
	);
};

export default SimpleProductCard;
