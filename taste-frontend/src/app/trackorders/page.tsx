"use client";
import OrderStatusSVG from "@/components/OrderStatusSVG";
import React, { useRef, useState, useLayoutEffect } from "react";

type Props = {
	stops: number;
};

const TrackOrder = ({ stops = 3 }: Props) => {
	return (
		<div className="flex h-screen">
			<div className="flex flex-row">
				<div>
					<div></div>
				</div>
				<div className="">
					<OrderStatusSVG
						stops={[
							{
								colored: true,
								primaryColor: "#22c55e",
								pulseColor: "#86efac",
								secondaryColor: "#9ca3af",
							},

							{
								colored: true,
								primaryColor: "#22c55e",
								pulseColor: "#86efac",
								secondaryColor: "#9ca3af",
							},
							{
								colored: false,
								primaryColor: "#22c55e",
								pulseColor: "#86efac",
								secondaryColor: "#9ca3af",
							},
							{
								colored: false,
								primaryColor: "#22c55e",
								pulseColor: "#86efac",
								secondaryColor: "#9ca3af",
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default TrackOrder;
