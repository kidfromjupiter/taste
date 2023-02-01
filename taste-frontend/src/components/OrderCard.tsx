"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSpring, animated, config } from "@react-spring/web";
import SpringContainer from "./SpringSquare";
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
	const [props, api] = useSpring(() => ({
		opacity: 1,
		scale: 0,
		left: 0,
		top: 0,
		height: 0,
		width: 0,
		// config: config.wobbly,
	}));

	const router = useRouter();
	return (
		<div
			className="py-3 px-3 border-b-2 border-b-slate-100 relative overflow-hidden"
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
				});
				api.start({
					opacity: 0,
					scale: 2,
					config: { tension: 200, mass: 5, friction: 60 },
					// config: config.molasses,
				});
				router.push(`/trackorders/${id}`);
				console.log(e);
			}}
		>
			<div className="flex flex-row justify-between my-4">
				<div className="font-semibold text-gray-600 text-xl">{date}</div>
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
				<div className="text-gray-400 max-h-12 text-ellipsis overflow-hidden whitespace-nowrap ">
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
			<animated.span
				style={props}
				className="absolute bg-black bg-opacity-20 -z-10 rounded-full"
			></animated.span>
		</div>
	);
};

export default OrderCard;
