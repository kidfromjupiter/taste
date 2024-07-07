import React from "react";
import SpringContainer from "./SpringSquare";

type Props = {
	text: string;
	icon: React.ReactNode;
	onClick?: () => void;
};

const AccountEditButton = ({ text, icon, onClick }: Props) => {
	return (
		<SpringContainer
			className="  bg-gradient-to-tr from-emerald-900 to-emerald-600 text-white rounded-xl h-32 relative"
			enableHover={false}
			touchEndCallback={onClick}
		>
			<div className="flex justify-end items-end h-full w-full">
				<div className="absolute top-5 left-5">{icon}</div>
				<div className="text-right font-medium">{text}</div>
			</div>
		</SpringContainer>
	);
};

export default AccountEditButton;
