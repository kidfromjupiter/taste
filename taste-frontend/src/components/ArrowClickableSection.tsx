import React from "react";
import { FiChevronRight } from "react-icons/fi";
type Props = {
	onClick: () => void;
	text: string;
	className?: string;
};

const ArrowClickableSection = ({ onClick, text, className }: Props) => {
	return (
		<div
			className={`flex justify-between items-center ${className}`}
			onClick={onClick}
		>
			<div>{text}</div>
			<div>
				<FiChevronRight size={30} />
			</div>
		</div>
	);
};

export default ArrowClickableSection;
