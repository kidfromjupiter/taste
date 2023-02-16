"use client";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "./sidebar";

export default function Layout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" style={{ height: "100%" }}>
			<body className=" min-h-full margin-0">
				<div className=" ">
					<ProSidebarProvider>
						<div className="flex-col md:flex-row flex ">
							<SideBar />

							<div className="w-full mt-16">
								<AnimatePresence
									mode="wait"
									initial={false}
									onExitComplete={() => window.scrollTo(0, 0)}
								>
									{children}
								</AnimatePresence>
							</div>
						</div>
					</ProSidebarProvider>
				</div>
			</body>
		</html>
	);
}
