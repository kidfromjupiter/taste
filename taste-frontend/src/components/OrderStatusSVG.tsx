"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animated, useSpring, config } from "@react-spring/web";

type Stop = {
	colored: boolean;
	primaryColor: string;
	secondaryColor: string;
	pulseColor?: string;
};

type Props = {
	stops: Stop[];
};

const OrderStatusSVG = ({ stops }: Props) => {
	const svgHolderRef = useRef<HTMLDivElement>(null);
	const [measurements, setMeasurements] = useState({
		x: 0,
		y: 0,
		height: 0,
		width: 0,
	});
	useLayoutEffect(() => {
		if (svgHolderRef.current) {
			const { x, y, height, width } =
				svgHolderRef.current.getBoundingClientRect();
			setMeasurements({ x, y, height, width });
		}
	}, [svgHolderRef]);
	const pulseCircleStyles = useSpring({
		from: {
			r: 10,
			opacity: 1,
		},
		to: {
			r: 20,
			opacity: 0,
		},
		config: config.molasses,

		loop: true,
	});
	const [pulseLineStyle, pulseLineApi] = useSpring(
		() => ({
			from: {
				stroke: "#0f172a",
				strokeDashoffset: 0,
			},
			to: {
				stroke: "#7f1d1d",
				strokeDashoffset: 0,
			},
			loop: { reverse: true },
			config: config.molasses,
		}),
		[stops]
	);

	if (measurements.height !== 0 && measurements.width !== 0) {
		return (
			<div ref={svgHolderRef} className="h-full w-full overflow-visible">
				<svg height="100%" width="100%">
					{stops.map((stop, i) => {
						const numStops = stops.length;
						const y = (i * measurements.height + 100) / numStops;

						const x = measurements.width / 2;
						const nextStopY = ((i + 1) * measurements.height + 100) / numStops;

						const nextStop = i !== numStops - 1 ? stops[i + 1] : null;
						const pulseLine =
							stop.colored && nextStop && !nextStop.colored
								? true
								: stop.colored && !nextStop
								? true
								: false;

						if (pulseLine) {
							pulseLineApi.start({
								from: {
									stroke:
										i == 0 ? stops[i].primaryColor : stops[i - 1].primaryColor,
									strokeDashoffset: 22,
								},
								to: {
									stroke: stop.secondaryColor,
									strokeDashoffset: 0,
								},
								loop: true,
								config: { duration: 2000 },
							});
						}
						if (i !== numStops - 1) {
							return (
								<>
									{stop.pulseColor && stop.colored ? (
										<animated.circle
											style={pulseCircleStyles}
											cx={x}
											cy={y}
											fill={stop.pulseColor}
										></animated.circle>
									) : null}

									<animated.path
										d={`M${x} ${y + 20} L${x} ${nextStopY - 20}`}
										style={
											pulseLine
												? pulseLineStyle
												: {
														stroke: stop.colored
															? stop.primaryColor
															: stop.secondaryColor,
												  }
										}
										strokeDasharray={pulseLine ? "10 12" : 0}
										strokeWidth={5}
										strokeLinecap="round"
									></animated.path>
									<circle
										cx={x}
										cy={y}
										r={10}
										fill={
											stop.colored ? stop.primaryColor : stop.secondaryColor
										}
										key={i}
									></circle>
								</>
							);
						}
						return (
							<>
								{stop.pulseColor && stop.colored ? (
									<animated.circle
										style={pulseCircleStyles}
										cx={x}
										cy={y}
										fill={stop.pulseColor}
									></animated.circle>
								) : null}
								<circle
									cx={x}
									cy={y}
									r={10}
									fill={stop.colored ? stop.primaryColor : stop.secondaryColor}
								></circle>
							</>
						);
					})}
				</svg>
			</div>
		);
	}
	return <div ref={svgHolderRef} className="w-full h-full"></div>;
};

export default OrderStatusSVG;
