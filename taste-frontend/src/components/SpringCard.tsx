import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FiPlus } from "react-icons/fi";
import { BsChevronBarDown } from "react-icons/bs";
type Props = {
	show: boolean;
	hideCallback: () => void;
	title: string;
};

const SpringCard = ({ show = false, hideCallback, title }: Props) => {
	const [springStyles, springApi] = useSpring(() => ({
		transform: "translateY(100%)",
	}));
	const [overlayStyles, overlayApi] = useSpring(() => ({
		opacity: 0,
	}));

	if (show) {
		springApi.start({
			transform: "translateY(0%)",
		});
		overlayApi.start({
			opacity: 1,
		});

		return (
			<>
				<animated.div
					style={springStyles}
					className=" shadow-top bg-gray-100 absolute w-full top-1/3 h-2/3 overflow-hidden  z-50 pt-5"
				>
					<div className="flex items-center justify-center relative p-3">
						<div>
							<h3 className="font-semibold text-xl">{title}</h3>
							{/* <BsChevronBarDown className=" absolute top-3 right-3 text-4xl text-gray-400" /> */}
						</div>
					</div>
					<div className="h-full w-full overflow-auto">
						{Array.from({ length: 10 }).map((_, i) => (
							<div key={i} className="h-24 px-3">
								Hey
							</div>
						))}
					</div>
				</animated.div>
				<animated.div
					className="top-0 right-0 h-screen w-screen bg-black bg-opacity-60 absolute z-10"
					style={overlayStyles}
					onClick={() => {
						springApi.start({
							transform: "translateY(100%)",
							onRest: () => {
								hideCallback();
							},
						});
						overlayApi.start({
							opacity: 0,
						});
					}}
				></animated.div>
			</>
		);
	}
	return null;
};

export default SpringCard;
