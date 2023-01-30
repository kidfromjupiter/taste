"use client";
import OrderStatusSVG from "@/components/OrderStatusSVG";
import React, { useRef, useState, useLayoutEffect } from "react";

type Props = {
	stops: number;
};

const TrackOrder = ({ stops = 3 }: Props) => {
	return (
		<div className="flex h-screen flex-col px-3 py-4  w-full">
			<div className="w-full">
				<h3 className="text-4xl font-bold mb-3 ">Track Order</h3>
				<div className="flex flex-row items-center w-full justify-between my-2">
					<div className=" text-gray-500 font-semibold ">
						<div>Wed, 12th September</div>
						<div>Order ID: 90ejiff90322</div>
					</div>
					<div className="text-2xl">345Rs</div>
				</div>
			</div>
			<div className="flex flex-col font-semibold mt-4">
				<div className="text-gray-600 text-2xl mb-5">
					<h3>ETA: Thu, 20th September</h3>
				</div>
				<div className="flex h-full overflow-visible">
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
					<div>
						<div className="h-32 pl-5 pr-24">Packaging complete</div>
						<div className="h-32 pl-5 pr-24">Packaging complete</div>
						<div className="h-32 pl-5 pr-24">Packaging complete</div>
						<div className="h-32 pl-5 pr-24">Packaging complete</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackOrder;
