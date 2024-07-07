import React from "react";
import { useTrail, animated } from "@react-spring/web";

export default function StaggeredList({
	children,
}: {
	children: React.ReactNode;
}) {
	const items = React.Children.toArray(children);
	const trail = useTrail(items.length, {
		config: { tension: 1000, friction: 50, clamp: true },
		opacity: 1,
		scale: 1,
		y: 0,
		from: { opacity: 0, y: -40, scale: 0.95 },
	});
	return (
		<>
			{trail.map(({ y, ...style }, index) => (
				<animated.div key={index} style={style}>
					<animated.div style={{ y }}>{items[index]}</animated.div>
				</animated.div>
			))}
		</>
	);
}
