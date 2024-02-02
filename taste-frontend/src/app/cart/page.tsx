"use client";
import ListProduct from "@/components/ListProduct";
import React, { useEffect, useRef, useState } from "react";
import {
	useMotionValue,
	useSpring,
	motion,
	useInView,
	useMotionValueEvent,
} from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import SpringContainer from "@/components/SpringSquare";
import useBorderRadiusBlob from "@/components/hooks/useBorderRadiusBlob";
import FramerWrapper from "@/components/FramerWrapper";
import { getCart } from "@/aux/fetch/authenticated_apis";
import { CartItem, Product } from "../types";


type Props = {};

const Cart = (props: Props) => {
	const [blobStyles, startBlob] = useBorderRadiusBlob();
	const translate = useMotionValue(0);
	const rotate = useMotionValue(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref);
	const [itemList, setItemList] = useState<any[]>([]);

	useEffect(() => {
		if (isInView) {
			translate.set(200);
			rotate.set(180);
		} else {
			translate.set(0);
			rotate.set(0);
		}
	}, [isInView]);

	const translate_rotate = () => {
		if (translate.get() == 0) {
			translate.set(200);
			rotate.set(180);
		} else {
			translate.set(0);
			rotate.set(0);
		}
	};
	const translateStyle = useSpring(translate, {
		stiffness: 150,
		damping: 20,
	});
	const rotateStyle = useSpring(rotate, {});
	useEffect(() => {
		// startBlob();
		getCart().then((data) => {
			setItemList(data); console.log(data);
		});


	}, []);

	return (
		<FramerWrapper>
			<div className="w-full px-3  h-full overflow-auto mb-10 ">
				{itemList?.map((p: CartItem, i: number) => {
					if (i == 9) {
						return (
							<div key={i} ref={ref}>
								<ListProduct
									{...p.product}
									removeItem={() => console.log("remove item")}
								/>
							</div>
						);
					}
					return (
						<ListProduct
							key={i}
							{...p.product}
							removeItem={() => console.log("remove item")}
						/>
					);
				})}
			</div>
			<motion.div
				className="fixed w-full h-60 bg-white shadow-top bottom-0 z-50 dark:bg-zinc-800"
				style={{ translateY: translateStyle }}
			>
				<div
					className="flex justify-center items-center text-slate-500 pt-2"
					onPointerDown={translate_rotate}
				>
					<motion.div style={{ rotate: rotateStyle }}>
						<BsChevronDown size={27} />
					</motion.div>
				</div>
				<div className="pb-10 pt-3 px-5 ">
					<div className="w-full flex flex-col justify-center">
						<div className="pb-3 border-b-slate-200 border-b-2 dark:border-b-neutral-800">
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
					<SpringContainer
						className=""
						childrenHolderClassName="text-white from-emerald-500 to-sky-500 bg-gradient-to-tr py-3 text-center mt-4 font-semibold rounded-sm"
					>
						Proceed to checkout
					</SpringContainer>
				</div>
			</motion.div>
		</FramerWrapper>
	);
};

export default Cart;
