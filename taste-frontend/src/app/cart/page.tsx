"use client";
import CartItemListComponent from "@/components/CartListItem";
import React, { useEffect, useRef, useState } from "react";
import {
	useMotionValue,
	useSpring,
	motion,
	useInView,
} from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import SpringContainer from "@/components/SpringSquare";
import useBorderRadiusBlob from "@/components/hooks/useBorderRadiusBlob";
import FramerWrapper from "@/components/FramerWrapper";
import { getCart, removeFromCart, addToCart, decreaseQuantity } from "@/aux/fetch/authenticated_apis";
import { CartItem, Product } from "../types";

//TODO : add logic to determine the total price of cart items. or grab it from backend
type Props = {};

const Cart = (props: Props) => {
	const translate = useMotionValue(0);
	const rotate = useMotionValue(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref);
	const [itemList, setItemList] = useState<any[]>([]);
  const [cartValue,setCartValue] = useState<number>(0);
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
      console.log(data);
      
			setItemList(data.cartitems);
      setCartValue(data.value)
		});


	}, []);
	const updateItemlist = (item: CartItem) => {
		setItemList((prev) => {
			const index = prev.findIndex((p) => p.id == item.id);
			const newItems = [...prev];
			newItems[index] = item;
			return newItems;
		});
	}
	return (
		<FramerWrapper>
      <div id='container' className="block w-full md:grid grid-flow-col h-screen">
			  <div className="w-full px-3  h-full overflow-auto mb-10 ">
			  	{itemList?.map((p: CartItem, i: number) => {
			  		if (i == 9) {
			  			return (
			  				<div key={p.id} ref={ref}>
			  					<CartItemListComponent
			  						addToCart={() => addToCart(p.product.id).then(res => { updateItemlist(res) })}
			  						decreaseQuantity={() => decreaseQuantity(p.id).then(res => { updateItemlist(res) })}
			  						removeItem={() => console.log("remove item")}
			  						{...p}

			  					/>
			  				</div>
			  			);
			  		}
			  		return (
			  			<CartItemListComponent
			  				addToCart={() => addToCart(p.product.id).then(res => { updateItemlist(res) })}
			  				decreaseQuantity={() => decreaseQuantity(p.id).then(res => { updateItemlist(res) })}
			  				key={p.id}
			  				removeItem={() => console.log("remove item")}
			  				{...p}
			  			/>
			  		);
			  	})}
			  </div>
        <div className="relative hidden md:flex flex-col justify-between ml-8">

          <div>Click on a cart item to see more info</div>
			    <motion.div
			    	className=" bg-white bottom-0 z-30 dark:bg-neutral-900 hidden md:block"
			    >
			    	<div className=" py-3 px-5 ">
			    		<div className=" flex flex-col justify-center">
			    			<div className="pb-3 border-b-slate-200 border-b-2 dark:border-b-neutral-800">
			    				<div className="flex justify-between pb-2">
			    					<div>Subtotal items ({itemList.length})</div>
			    					<div>{cartValue}</div>
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
        </div>
      </div>
      
      {/*this is the checkout div on mobile devices*/}
			<motion.div
				className="right-0 fixed w-full h-60 bg-white shadow-top bottom-0 z-30 dark:bg-zinc-800 block md:hidden"
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
					<div className="flex flex-col justify-center">
						<div className="pb-3 border-b-slate-200 border-b-2 dark:border-b-neutral-800">
							<div className="flex justify-between pb-2">
								<div>Subtotal items ({itemList.length})</div>
								<div>{cartValue}</div>
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
