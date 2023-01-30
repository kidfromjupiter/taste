"use client";
import OrderStatusSVG from "@/components/OrderStatusSVG";
import React, { useRef, useState, useLayoutEffect } from "react";
import { TfiPackage } from "react-icons/tfi";
import { TbChartArcs, TbGridDots, TbTruckDelivery } from "react-icons/tb";

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
				<div className="text-gray-600 text-2xl mb-10">
					<h3>ETA: Thu, 20th September</h3>
				</div>
				<div className="flex h-full overflow-visible">
					<div className="flex flex-[1]">
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
					<div className="flex flex-[4] flex-col">
						<div className="flex flex-row items-center mb-10">
							<div className="m-4 mr-6 text-4xl">
								<TbChartArcs />
							</div>
							<div>
								<div className="font-semibold text-lg">Processing Complete</div>
								<div className="text-gray-400 font-regular text-md">
									10:57am, 18th Sep
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center mb-10">
							<div className="m-4 mr-6 text-4xl">
								<TfiPackage />
							</div>
							<div>
								<div className="font-semibold text-lg">Packaging Complete</div>
								<div className="text-gray-400 font-regular text-md">
									10:57am, 18th Sep
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center mb-10">
							<div className="m-4 mr-6 text-4xl">
								<TbGridDots />
							</div>
							<div>
								<div className="font-semibold text-lg">
									Sorted and stored for delivery
								</div>
								<div className="text-gray-400 font-regular text-md">
									10:57am, 18th Sep
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center mb-10">
							<div className="m-4 mr-6 text-4xl">
								<TbTruckDelivery />
							</div>
							<div>
								<div className="font-semibold text-lg">
									Dispatched for delivery
								</div>
								<div className="text-gray-400 font-regular text-md">
									10:57am, 18th Sep
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackOrder;
