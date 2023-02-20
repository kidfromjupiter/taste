"use client";
import FramerWrapper from "@/components/FramerWrapper";
import OrderCard from "@/components/OrderCard";
import React from "react";

type Props = {};

const OrderTrackerIndex = (props: Props) => {
	return (
		<FramerWrapper>
			<div>
				{Array.from({ length: 10 }).map((_, i) => {
					return (
						<OrderCard
							key={i}
							date={"Today, 03:31PM".toUpperCase()}
							cancelled={false}
							items={[
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
								{ name: "Turmeric Powder", quantity: 3 },
							]}
							eta="Thu, 18th May"
							price={345}
							id={`${i}`}
						/>
					);
				})}
			</div>
		</FramerWrapper>
	);
};

export default OrderTrackerIndex;
