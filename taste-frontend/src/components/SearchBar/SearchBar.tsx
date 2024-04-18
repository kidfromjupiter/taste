import * as React from "react";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

type Props = {
	onChangeCallback?: (value: string) => void;
	placeholder?: string;
	value?: string;
	className?: string;
	onEnter?: (value: string) => void;
};

const SearchBar = ({
	onChangeCallback,
	placeholder = "Search",
	onEnter,
	className = "",
	value = "",
}: Props) => {
	const [text, setText] = useState(value);
	const [keycode, setKeycode] = useState("");
	const [styles, api] = useSpring(() => ({
		scale: 1,
	}));

	return (
		<animated.div className="" style={styles}>
			<input
				value={text}
				onChange={(e) => {
					onChangeCallback?.(e.target.value);
					setText(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key == "Backspace") {
						return api.start({ scale: 0.975 });
					}
				}}
				onKeyUp={(e) => {
					if (e.key == "Backspace") {
						return api.start({ scale: 1 });
					}
					if (e.key == "Enter") {
						onEnter?.(text);
					}
				}}
				className={`bg-gray-100 placeholder-slate-400 outline-none ring-0 rounded-full w-full px-10 py-3 ${className}`}
				placeholder={placeholder}
			/>
		</animated.div>
	);
};

export default SearchBar;
