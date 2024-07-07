import React, { useState, useEffect } from "react";
import SpringContainer from "./SpringSquare";

type Props = {
	buttonClass?: string;
	onclickCallback: () => void;
	buttonText: string;
	buttonTextHolderClasses?: string;
};

export default function ButtonHolder({
	buttonClass = "",
	onclickCallback,
	buttonTextHolderClasses = "",
	buttonText = "Button",
}: Props) {
	return (
		<SpringContainer
			mouseEnter={{ scale: 1 }}
			mouseDown={{ scale: 0.95 }}
			className={buttonClass}
			childrenHolderClassName={buttonTextHolderClasses}
			touchEndCallback={onclickCallback}
		>
			<div style={{ userSelect: "none" }}>{buttonText}</div>
		</SpringContainer>
	);
}
