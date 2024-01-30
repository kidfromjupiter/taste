import { useEffect, useState } from "react";
import {
	AnimationControls,
	useAnimationControls,
	useInView,
} from "framer-motion";
import { useInView as useInView_spring } from "@react-spring/web";
import {
  useWindowWidth,
} from '@react-hook/window-size'

function useBorderRadiusBlob(): [
	AnimationControls,
	() => void,
	() => void,
	React.RefObject<any>
] {
	const [returned_ref, isInView] = useInView_spring();
	const borderRadiusBlobControls = useAnimationControls();
	const onlyWidth = useWindowWidth();
	const [width, setWidth] = useState<number>(onlyWidth);
	// const [width, setWidth] = useState<number>(500);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		setTimeout(() => {
			setWidth(window.innerWidth);
		}, 500);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 768;
	function startBlob(): void {
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
	}
	function stopBlob(): void {
		borderRadiusBlobControls.stop();
	}

	useEffect(() => {
		if (!isMobile) {
			if (isInView) {
				startBlob();
			} else if (!isInView) {
				stopBlob();
			}
		} else {
			borderRadiusBlobControls.set({
				borderRadius: "33% 67% 70% 30% / 30% 30% 70% 70%",
			});
		}
		() => {
			stopBlob();
		};
	}, [isInView, width]);

	return [borderRadiusBlobControls, startBlob, stopBlob, returned_ref];
}

export default useBorderRadiusBlob;
