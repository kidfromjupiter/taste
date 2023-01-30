import * as React from "react";
import { useState, useEffect } from "react";
import GenericDropdown, {
	DropDownItem,
	DropdownProps,
} from "../GenericDropdown";

type filterObject = {
	dropdownProps: DropdownProps;
};

type Props = {
	children?: React.ReactNode;
	filterArray: filterObject[];
};

const DropdownHolder = ({ children, filterArray = [] }: Props) => {
	return (
		<div className="inline-flex flex-wrap">
			{filterArray.map((filterObj, index) => {
				return (
					<div className="p-1 md:px-2 " key={index}>
						<GenericDropdown {...filterObj.dropdownProps} />
					</div>
				);
			})}
		</div>
	);
};

export default DropdownHolder;
