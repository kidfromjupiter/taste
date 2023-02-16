import React from "react";
import construction from "../../../public/construction.png";
import Image from "next/image";
type Props = {};

const ComingSoon = (props: Props) => {
	return (
		<div className="bg-emerald-700 h-screen flex flex-col items-center justify-center">
			<Image src={construction} alt="under construction" className="p-5" />
			<h1 className="text-3xl font-bold text-emerald-300 text-center py-5 px-5">
				{"OOPS! We're still working on it."}
			</h1>
			<div className="text-emerald-400 font-semibold text-lg">
				Please check again later.
			</div>
		</div>
	);
};

export default ComingSoon;
