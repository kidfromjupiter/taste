import React, { useState, useEffect } from "react";
import {
	useSpring,
	animated,
	SpringConfig,
	ControllerUpdate,
} from "@react-spring/web";

interface SpringContainerProps {
	childrenHolderClassName?: string;
	className: string;
	children?: any;
	primary?: string;
	secondary?: string;
	mouseConfig?: SpringConfig;
	touchConfig?: SpringConfig;
	mouseDown?: ControllerUpdate;
	touchStart?: ControllerUpdate;
	mouseEnter?: ControllerUpdate;
	defaultValue?: ControllerUpdate;
	touchEndCallback?: (e: React.MouseEvent<HTMLDivElement>) => void;
	hoverCallback?: () => void;
	hoverEndCallback?: () => void;
	enableHover?: boolean;
}

const SpringContainer: React.FunctionComponent<SpringContainerProps> = ({
	secondary,
	primary,
	children,
	className,
	mouseConfig = { tension: 500 },
	touchConfig = { tension: 800 },
	defaultValue = { scale: 1 },
	mouseDown = { scale: 0.95 },
	touchStart = { scale: 0.9 },
	mouseEnter = { scale: 1.05 },
	childrenHolderClassName = "p-6 h-full w-full relative",
	touchEndCallback,
	hoverCallback,
	hoverEndCallback,
	enableHover = false,
}) => {
	const [styles, api] = useSpring(() => {
		return defaultValue;
	});

	return (
		<animated.div
			className={className}
			onMouseDown={(e) => {
				e.stopPropagation();
				api.start({ ...mouseDown, config: mouseConfig });
			}}
			onMouseUp={() => {
				api.start({ ...defaultValue });
			}}
			onTouchStart={(e) => {
				e.stopPropagation();
				api.start({ ...touchStart, config: touchConfig });
			}}
			onTouchEnd={() => {
				api.start({ ...defaultValue });
			}}
			onTouchCancel={() => {
				api.start({ ...defaultValue });
			}}
			onMouseLeave={() => {
				hoverEndCallback?.();
				api.start({ ...defaultValue });
			}}
			onTouchMove={(e) => {
				api.start({ ...defaultValue });
			}}
			onMouseEnter={() => {
				if (enableHover) {
					hoverCallback?.();
					api.start({ ...mouseEnter });
				}
			}}
			style={styles}
			onClick={(e) => touchEndCallback?.(e)}
			// style={[...styles, { backgroundColor: color }]}
		>
			<div
				className={childrenHolderClassName}
				style={{
					backgroundImage: `linear-gradient(to top right,${primary},${secondary})`,
				}}
			>
				{children}
			</div>
		</animated.div>
	);
};
export default SpringContainer;
