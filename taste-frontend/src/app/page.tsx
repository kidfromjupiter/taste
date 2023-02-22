"use client";
import CollectionCardSimple from "@/components/CollectionCardSimple";
import FramerWrapper from "@/components/FramerWrapper";
import useBorderRadiusBlob from "@/components/hooks/useBorderRadiusBlob";
import SearchBar from "@/components/SearchBar/SearchBar";
import SimpleProductCard from "@/components/SimpleProductCard";
import { useEffect } from "react";

export default function Page() {
	const [blobStyles, startBlob] = useBorderRadiusBlob();
	useEffect(() => {
		startBlob();
	}, []);

	return (
		<FramerWrapper>
			<div className="flex flex-col px-3 dark:bg-neutral-900">
				<div className="py-3 ">
					<SearchBar className="dark:bg-zinc-800 text-white" />
				</div>
				<div className="w-full py-3 mb-3">
					<div
						className=" rounded-2xl  h-60 bg-cover bg-center shadow-lg relative overflow-hidden text-white p-4 flex flex-col"
						style={{ backgroundImage: `url('${"/spices.jpg"}')` }}
					>
						<div className="absolute h-full w-full bg-black bg-opacity-60 top-0 z-10 left-0 dark:bg-opacity-40"></div>
						<h1 className="z-20 text-6xl font-bold pb-5">Spices?</h1>
						<h3 className="z-20 text-4xl font-medium">Taste.</h3>
					</div>
				</div>
				<div className="flex flex-col mb-3">
					<h3 className="text-3xl font-bold mb-3 dark:text-gray-50">
						New Arrivals
					</h3>
					<div className=" whitespace-nowrap grid grid-flow-col gap-3 overflow-auto pb-3">
						{Array.from({ length: 10 }).map((_, i) => (
							<SimpleProductCard key={i} borderStyles={blobStyles} />
						))}
					</div>
				</div>
				<div className="flex flex-col mb-3">
					<h3 className="text-3xl font-bold mb-3 dark:text-gray-50">
						Collections
					</h3>
					<div className=" whitespace-nowrap grid grid-flow-col gap-3 overflow-auto pb-3">
						<CollectionCardSimple
							title="Exotic treats"
							url=""
							imgUrl="/spice_collection.jpg"
						/>
						{Array.from({ length: 10 }).map((_, i) => (
							<CollectionCardSimple
								title="Daily Essentials"
								url=""
								imgUrl="/daily_essentials.webp"
								key={i}
							/>
						))}
					</div>
				</div>
			</div>
		</FramerWrapper>
	);
}
