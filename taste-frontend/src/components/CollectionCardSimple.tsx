import Image from "next/image";
import React from "react";
import SpringContainer from "./SpringSquare";
import daily_essentials from "../../public/daily_essentials.webp";

type Props = {
	url: string;
	title: string;
	imgUrl: string;
};

const CollectionCardSimple = ({ imgUrl, url, title }: Props) => {
	return (
		<SpringContainer
			className="rounded-lg "
			childrenHolderClassName=" p-0 relative  h-48 w-48 overflow-hidden rounded-lg"
		>
			<div className="absolute top-0 right-0">
				<Image
					src={daily_essentials || imgUrl}
					alt="spice bottle"
					className="bg-cover bg-center "
				/>
			</div>
			<div className="overflow-hidden h-full flex items-end justify-end whitespace-normal lg:cursor-pointer">
				<h4 className="text-gray-50 z-30  font-semibold text-3xl text-right flex p-3">
					{title}
				</h4>

				<div className=" bg-gradient-to-t from-[rgba(0,0,0,.79)] absolute h-full w-full z-10 top-0"></div>
			</div>
		</SpringContainer>
	);
};

export default CollectionCardSimple;
