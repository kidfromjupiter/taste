import { LazyMotion, m, domAnimation, useSpring } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { FeatureBundle } from "framer-motion";
type Props = {
	children: React.ReactNode;
  className?:string;
};

const FramerWrapper = ({className, children }: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<LazyMotion features={domAnimation}>
			<m.div
				ref={ref}
				initial={{ x: 300, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -300, opacity: 0 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 25,
				}}
				onAnimationComplete={() =>
					window.scrollTo({ top: 0, behavior: "smooth" })
				}
        style={{width:'inherit'}}
        className={className}
			>


				{children}
			</m.div>
		</LazyMotion>
	);
};

export default FramerWrapper;
