import React from "react";
import { useSpring, animated } from "@react-spring/web";

type Props = {
	onClickAction: () => void;
	children: React.ReactNode;
	rippleColor?: string;
	className?: string;
	rippleOpacity?: number;
};

const RippleCard = ({
	onClickAction,
	children,
	className,
	rippleColor,
	rippleOpacity,
}: Props) => {
	const [props, api] = useSpring(() => ({
		backgroundColor: rippleColor ? rippleColor : "#d4d4d4",
		opacity: 1,
		scale: 0,
		left: 0,
		top: 0,
		height: 0,
		width: 0,
		backgroundOpacity: rippleOpacity ? rippleOpacity : 0.5,
		// config: config.wobbly,
	}));
	return (
		<div
			className={`relative overflow-hidden ${className}`}
			onClick={(e) => {
				e.preventDefault();
				const rippleContainer = e.currentTarget.getBoundingClientRect();
				const size =
					rippleContainer.width > rippleContainer.height
						? rippleContainer.width
						: rippleContainer.height;
				const x = e.clientX - rippleContainer.x - size / 2;
				const y = e.clientY - rippleContainer.y - size / 2;

				api.start({
					top: y,
					left: x,
					height: size,
					width: size,
					immediate: true,
					opacity: 1,
					scale: 0,
					onRest(result, ctrl, item) {
						api.start({
							opacity: 0,
							scale: 2,
							config: { tension: 200, mass: 5, friction: 60 },
						});
					},
				});

				onClickAction();
			}}
		>
			{children}
			<animated.span
				style={props}
				className="absolute -z-10 rounded-full"
			></animated.span>
		</div>
	);
};

export default RippleCard;
