import { clearMessage, MessageState, MessageType } from "@/aux/messagingSlice";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDone, MdOutlineErrorOutline } from "react-icons/md";

type Props = {};

const MessageLayer = (props: Props) => {
	const message: MessageState = useSelector((state: any) => state.message);
	const dispatch = useDispatch();
	useEffect(() => {
		if (message.message !== "") {
			setTimeout(() => {
				dispatch(clearMessage());
			}, 3000);
		}
	}, [message]);

	const renderSwitch = (param: MessageType) => {
		switch (param) {
			case MessageType.SUCCESS:
				return (
					<div className="from-emerald-500 to-emerald-400 bg-gradient-to-tr to text-white flex justify-center items-center p-2 rounded-full">
						<MdDone size={27} />
					</div>
				);

			case MessageType.ERROR:
				return (
					<div className="from-red-600 to-rose-500 bg-gradient-to-tr text-white flex justify-center items-center p-2 rounded-full">
						<MdOutlineErrorOutline size={27} />
					</div>
				);
			case MessageType.INFO:
				return (
					<div className="from-sky-600 to-sky-500 bg-gradient-to-tr text-white flex justify-center items-center p-2 rounded-full">
						<MdOutlineErrorOutline size={27} />
					</div>
				);
		}
	};

	return (
		<AnimatePresence mode="wait">
			{message.message !== "" && (
				<motion.div
					className="fixed z-50 bg-gray-50 shadow-lg origin-bottom-right rounded-full flex p-1 items-center"
					initial={{ bottom: 0, scale: 0, right: 0 }}
					animate={{
						bottom: 20,
						right: 20,
						scale: 1,
					}}
					exit={{ opacity: 0, bottom: 0, scale: 0 }}
					transition={{ type: "spring", stiffness: 500, damping: 20 }}
				>
					<div>{renderSwitch(message.type)}</div>
					<div className="px-3">{message.message}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MessageLayer;
