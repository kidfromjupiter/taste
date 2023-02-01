"use client";

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, {
	useRef,
	useCallback,
	UIEvent,
	useState,
	useEffect,
} from "react";
import { useSpring, animated } from "@react-spring/web";
import FramerWrapper from "@/components/FramerWrapper";

type Props = {};

const ExplorePage = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [style, api] = useSpring(() => ({
		transform: "translateY(0%)",
		immediate: true,
	}));
	const [scrollUp, setscrollUp] = useState(false);

	const headerHeight = 200;
	const topHeaderHeight = 80;
	let lastScrollTop = 0;
	let accumScrollMovement = 0;
	const UP = 0;
	const DOWN = 1;
	let previousDirection = DOWN;
	let headerTopRevealed = false;
	const onScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
		// eslint-disable-next-line no-unused-vars
		let currentDirection;
		const scrollDiff = e.currentTarget.scrollTop - lastScrollTop;
		if (scrollDiff > 0) {
			currentDirection = DOWN;
		} else {
			currentDirection = UP;
			if (e.currentTarget.scrollTop > headerHeight) {
				if (previousDirection === DOWN) {
					accumScrollMovement = Math.abs(scrollDiff);
				}
				accumScrollMovement += Math.abs(scrollDiff);
				if (accumScrollMovement > 100) {
					api({
						transform: "translate3d(0px, 0px 0px)",
						immediate: false,
					});
					headerTopRevealed = true;
				}
			}
		}

		if (
			e.currentTarget.scrollTop > headerHeight - topHeaderHeight &&
			e.currentTarget.scrollTop <= headerHeight &&
			!headerTopRevealed &&
			currentDirection === UP
		) {
			api({
				immediate: true,
				transform: "translate3d(0px, 0px, 0px)",
			});
		} else if (
			e.currentTarget.scrollTop > headerHeight &&
			currentDirection === DOWN
		) {
			api({
				immediate: false,
				transform: "translate3d(0px, -100%, 0px)",
			});
			headerTopRevealed = false;
		} else if (e.currentTarget.scrollTop < headerHeight - topHeaderHeight) {
			api({
				immediate: true,
				transform: "translate3d(0px, 0px, 0px)",
			});
			headerTopRevealed = false;
		}

		lastScrollTop = e.currentTarget.scrollTop;
		previousDirection = currentDirection;
	}, []);

	return (
		<FramerWrapper>
			<div className="h-screen relative">
				<animated.div
					style={style}
					className=" absolute z-10 flex w-full px-3 bg-white py-5 shadow-md"
					ref={ref}
				>
					<SearchBar className=" bg-gray-100 placeholder-slate-400 outline-none ring-0 rounded-full w-full px-10 py-3" />
				</animated.div>
				<div
					className="w-full grid-flow-row grid-cols-2 grid gap-3 px-3 pb-10 pt-24 h-full overflow-auto"
					onScroll={onScroll}
				>
					{Array.from({ length: 40 }).map((_, i) => {
						return <ProductCard key={i} />;
					})}
				</div>
			</div>
		</FramerWrapper>
	);
};
export default ExplorePage;
