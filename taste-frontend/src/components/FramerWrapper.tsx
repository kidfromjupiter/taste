import { LazyMotion, m, domAnimation } from "framer-motion";
import React from "react";

type Props = {
	children: React.ReactNode;
};

const FramerWrapper = ({ children }: Props) => {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				initial={{ x: 300, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -300, opacity: 0 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 25,
				}}
			>
				{children}
			</m.div>
		</LazyMotion>
	);
};

export default FramerWrapper;
