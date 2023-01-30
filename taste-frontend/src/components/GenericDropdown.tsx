import * as React from "react";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import SpringContainer from "./SpringSquare";
import StaggeredList from "./StaggeredList";
import { BsChevronDown } from "react-icons/bs";
export interface DropDownItem {
	dropdownText: string;
	callback: () => void;
	dropdownItemStyles?: string;
}
export interface DropdownProps {
	callback?: undefined;
	dropdownStyles?: string;
	dropdownTitleText?: string;
	dropdownButtonStyles?: string;
	dropDownItemList: DropDownItem[];
}

const GenericDropdown: React.FunctionComponent<DropdownProps> = ({
	callback,
	dropdownStyles,
	dropdownTitleText = "defaultText",
	dropdownButtonStyles = " rounded-full text-center hover:cursor-pointer bg-accentcolor text-slate-800 ",
	dropDownItemList = [],
}) => {
	const [open, setOpen] = useState(false);
	const [styles, api] = useSpring(() => ({ rotate: "0deg" }));

	useEffect(() => {
		if (open) {
			api.start({ rotate: "180deg" });
		} else {
			api.start({ rotate: "0deg" });
		}
	}, [open]);

	return (
		<div className="relative">
			<SpringContainer
				className={dropdownButtonStyles}
				mouseEnter={{ scale: 1 }}
				mouseDown={{ scale: 0.95 }}
				touchEndCallback={() => {
					setOpen(!open);
				}}
				childrenHolderClassName="py-3 px-4 flex flex-row items-center justify-around"
			>
				<div>{dropdownTitleText}</div>
				<animated.div style={styles} className="px-2">
					<BsChevronDown className="text-slate-800" />
				</animated.div>
			</SpringContainer>
			<div className="absolute w-full rounded-lg overflow-hidden mt-2 z-20">
				{open ? (
					<StaggeredList>
						{dropDownItemList.map((item, index) => {
							return (
								<div
									className={item.dropdownItemStyles}
									onClick={() => {
										setOpen(false);
										item.callback?.();
									}}
									key={index}
								>
									{item.dropdownText}
								</div>
							);
						})}
					</StaggeredList>
				) : null}
			</div>
		</div>
	);
};

export default GenericDropdown;
