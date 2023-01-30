import React from "react";
import SpringContainer from "./SpringSquare";

type Props = {
	url: string;
	title: string;
	imgUrl: string;
};

const CollectionCardSimple = ({ imgUrl, url, title }: Props) => {
	return (
		<SpringContainer
			className="bg-gray-50 rounded-lg "
			childrenHolderClassName=" p-0"
		>
			<div className="overflow-hidden h-48 w-48 rounded-2xl relative flex items-end justify-end whitespace-normal lg:cursor-pointer">
				<div
					style={{ backgroundImage: `url('${imgUrl}')` }}
					className="h-full w-full bg-center bg-cover z-0 absolute top-0"
				></div>
				<h4 className="text-gray-50 z-30  font-semibold text-3xl text-right flex p-3">
					{title}
				</h4>

				<div className=" bg-gradient-to-t from-[rgba(0,0,0,.79)] absolute h-full w-full z-10 top-0"></div>
			</div>
		</SpringContainer>
	);
};

export default CollectionCardSimple;
