import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import ListProduct from "./ListProduct";
import useBorderRadiusBlob from "./hooks/useBorderRadiusBlob";
import { AnimatePresence, motion } from "framer-motion";
type Props = {
	hideCallback: () => void;
	title: string;
};

const SpringCard = ({ hideCallback, title }: Props) => {
	// const [springStyles, springApi] = useSpring(() => ({
	// 	transform: "translateY(100%)",
	// }));
	// const [overlayStyles, overlayApi] = useSpring(() => ({
	// 	opacity: 0,
	// }));
	const [borderRadiusBlobStyles, startBlob] = useBorderRadiusBlob();
	useEffect(() => {
		startBlob();
	}, []);
	return (
		<>
			<motion.div
				className=" shadow-top bg-gray-100 w-full h-2/3 overflow-hidden absolute bottom-0 left-0 z-50 pt-3 dark:bg-neutral-900"
				initial={{ y: "100%" }}
				animate={{ y: "0%" }}
				exit={{ y: "100%" }}
				transition={{ type: "spring", stiffness: 150, damping: 20 }}
			>
				<div className="flex items-center justify-center relative p-3">
					<div>
						<h3 className="font-semibold text-xl">{title}</h3>
					</div>
				</div>
				<div className="h-full w-full overflow-auto">
					{Array.from({ length: 10 }).map((_, i) => (
						<ListProduct
							key={i}
							name="Turmeric Powder"
							price={300}
							id=""
							category=" Daily Essentials"
							simplified={true}
						/>
					))}
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="bottom-0 right-0 h-full w-screen bg-black bg-opacity-60 absolute z-10"
				onClick={hideCallback}
			></motion.div>
		</>
	);
};

export default SpringCard;
