"use client";
import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "./navs/sidebar";
import { initializeFirebase } from "@/aux/firebase";
import { store } from "../aux/store";
import { Provider } from "react-redux";
import MessageLayer from "@/components/MessageLayer";
import { useEffect, useRef } from "react";
import { verifysession } from "@/aux/fetch/auth";
import { setAuth } from "@/aux/authSlice";
export default function Layout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLHtmlElement>(null);
	initializeFirebase();
	useEffect(() => {
		//verifying cookies
		async function verify() {
			const responseData = await verifysession();
			store.dispatch(
				setAuth({
					displayName: responseData.name,
					email: responseData.email,
					uid: responseData.uid,
					photoUrl: responseData.picture,
					emailVerified: responseData.emailVerified,
					signedIn: true,
				})
			);
		}
		verify();
	}, []);

	return (
		<html lang="en">
			<body className=" min-h-screen margin-0 dark:bg-neutral-900 dark:text-gray-50">
				<Provider store={store}>
					<div className="grid grid-flow-row md:grid-cols-[200px_auto] min-h-screen h-screen">
						<SideBar />
						<div className="flex   justify-center  overflow-y-auto">
							<AnimatePresence mode="wait" initial={false}>
								<div className="mt-16 md:mt-0 flex w-full">{children}</div>
							</AnimatePresence>
							<MessageLayer />
						</div>
					</div>
				</Provider>
			</body>
		</html>
	);
}
