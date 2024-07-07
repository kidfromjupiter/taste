import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import SpringContainer from "./SpringSquare";
import useBorderRadiusBlob from "./hooks/useBorderRadiusBlob";
import { CartItemListComponentProps, ListProduct } from "@/app/types";
import { m } from "framer-motion";
import { useRef, useState } from "react";

const CartItemListComponent = ({
    removeItem,
    product,
    id, //cart item id
    quantity,
    addToCart,
    decreaseQuantity,
}: CartItemListComponentProps) => {
    const [blobStyles, _, __, ref] = useBorderRadiusBlob();
    const [_quantity, setquantity] = useState(quantity)

    const quantityTimer = useRef<null|NodeJS.Timeout>(null)
    const _increaseQuantity = async () =>{
      setquantity(_quantity +1)
      if (quantityTimer.current) {
        clearTimeout(quantityTimer.current)
      }
      quantityTimer.current = setTimeout(() => {
         addToCart?.(); 
      }, 200);


    }
    const _decreaseQuantity = async () =>{
      setquantity(_quantity -1)
      if (quantityTimer.current) {
        clearTimeout(quantityTimer.current)
      }
      quantityTimer.current = setTimeout(() => {
         addToCart?.(); 
      }, 200);


    }
    return (
        // <RippleCard onClickAction={() => {}}>
        <div className="flex border-b-gray-50 dark:border-neutral-800 border-b-2 px-3 items-center">
            <div className="relative flex justify-center items-center mr-5" ref={ref}>
                <div
                    style={{ backgroundImage: `url(${product.image})` }}
                    className=" h-24 w-24 bg-cover bg-center my-6 z-10"
                ></div>
                <m.span
                    animate={blobStyles}
                    className="w-28 h-28 m-auto bg-slate-100 absolute"
                ></m.span>
            </div>
            <div className="flex flex-col py-3 w-full dark:text-gray-50">
                <div className="flex flex-col relative">
                    <div className="font-semibold text-lg">{product.name}</div>
                    {/* <div className="text-sm text-slate-400 font-medium">{category}</div> */}
                    <div className="font-semibold">{parseFloat(product.domestic_price).toFixed(2)} {product.domestic_price_currency}</div>
                    {removeItem && (
                        <div
                            className="absolute top-0 right-0"
                            onClick={() => removeItem(product.id)}
                        >
                            <AiOutlineDelete size={30} />
                        </div>
                    )}
                </div>
                <div
                    className="flex pt-5 justify-end"
                    onClick={(e) => e.stopPropagation()}
                >
                    <SpringContainer
                        className="bg-gray-200 text-slate-700 rounded-md py-2 px-2 mx-2 dark:bg-neutral-600 dark:text-gray-50 "
                        childrenHolderClassName=""
                        mouseDown={{ scale: 0.85 }}
                        touchStart={{ scale: 0.85 }}
                        touchEndCallback={() => _decreaseQuantity()}
                    >
                        <HiOutlineMinus size={32} />
                    </SpringContainer>
                    <div className="text-white bg-emerald-700 rounded-md py-2 px-5 flex justify-center items-center ">
                        <div>300gx{_quantity}</div>
                    </div>
                    <SpringContainer
                        className="bg-gray-200 text-slate-700 rounded-md py-2 px-2 mx-2 dark:bg-neutral-600 dark:text-gray-50 "
                        childrenHolderClassName=""
                        mouseDown={{ scale: 0.85 }}
                        touchStart={{ scale: 0.85 }}
                        touchEndCallback={() =>_increaseQuantity()}
                    >
                        <HiOutlinePlus size={32} />
                    </SpringContainer>
                </div>
            </div>
        </div>
        // </RippleCard>
    );
};

export default CartItemListComponent;
