"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSpring, animated, config } from "@react-spring/web";
import SpringContainer from "./SpringSquare";
import RippleCard from "./RippleCard";
type Props = {
	date: string;
	eta: string;
	cancelled: boolean;
	price: number;
	items: Array<{
		name: string;
		quantity: number;
	}>;
	id: string;
};

const OrderCard = ({ date, eta, cancelled, price, items, id }: Props) => {
	const router = useRouter();
	return (
		<RippleCard onClickAction={() => router.push(`/orders/${id}`)}>
			<div className="py-3 px-3 border-b-2 border-b-slate-100 dark:border-b-neutral-800">
				<div className="flex flex-row justify-between my-4">
					<div className="font-semibold text-gray-600 text-xl dark:text-zinc-500">
						{date}
					</div>
					<div className="flex items-center">
						<div className="font-semibold text-lg">{price}Rs</div>
						<div>
							<FiChevronRight size={30} />
						</div>
					</div>
				</div>
				<div className="pl-5 font-semibold mb-4">
					<ul className=" list-disc mb-2">
						<li>ETA: {eta}</li>
					</ul>
					<div className="text-gray-400 max-h-6 overflow-hidden text-ellipsis ">
						{items.map((item) => {
							return ` ${item.name} (${item.quantity}),`;
						})}
					</div>
				</div>
				<div className="py-2 text-emerald-700 font-semibold flex justify-end px-3 z-20 select-none">
					<SpringContainer
						className=""
						childrenHolderClassName=""
						touchEndCallback={(e) => {
							e.stopPropagation();
							e.preventDefault();
						}}
					>
						ORDER AGAIN
					</SpringContainer>
				</div>
			</div>
		</RippleCard>
	);
};

export default OrderCard;
