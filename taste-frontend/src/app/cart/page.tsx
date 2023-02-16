"use client";
import ListProduct from "@/components/ListProduct";
import React, { useEffect } from "react";
import { useAnimationControls } from "framer-motion";
import ArrowClickableSection from "@/components/ArrowClickableSection";

type Props = {};

const Cart = (props: Props) => {
	const borderRadiusBlobControls = useAnimationControls();
	useEffect(() => {
		borderRadiusBlobControls.start({
			borderRadius: [
				"33% 67% 70% 30% / 30% 30% 70% 70%",
				"37% 63% 51% 49% / 37% 65% 35% 63%",
				"36% 64% 64% 36% / 64% 48% 52% 36%",
				"37% 63% 51% 49% / 30% 30% 70% 70%",
				"40% 60% 42% 58% / 41% 51% 49% 59%",
				"33% 67% 70% 30% / 30% 30% 70% 70%",
			],
			transform: ["rotateY(0deg)", "rotateY(10deg)"],

			transition: {
				duration: 30,
				repeat: Infinity,
				repeatType: "loop",
				ease: "easeInOut",
			},
		});
	}, []);
	return (
		<div className="">
			<div className="grid grid-flow-row gap-4 mb-60">
				{Array.from({ length: 10 }).map((_, i) => (
					<ListProduct
						key={i}
						borderStyles={borderRadiusBlobControls}
						removeItem={() => console.log("remove item")}
					/>
				))}
			</div>
			<div className="fixed w-full h-60 bg-white shadow-top bottom-0 z-50 py-10 px-5 ">
				<div className="w-full flex flex-col justify-center">
					<div className="pb-3 border-b-slate-200 border-b-2">
						<div className="flex justify-between pb-2">
							<div>Subtotal items (2)</div>
							<div>2400Rs</div>
						</div>
						<div className="flex justify-between ">
							<div>Delivery fee</div>
							<div>165Rs</div>
						</div>
					</div>
					<div className="pt-2">
						<div className="flex justify-between font-semibold">
							<div>Total</div>
							<div>2565Rs</div>
						</div>
					</div>
				</div>
				<div className="text-white from-emerald-500 to-sky-500 bg-gradient-to-tr py-3 text-center mt-4 font-semibold">
					Proceed to checkout
				</div>
			</div>
		</div>
	);
};

export default Cart;
