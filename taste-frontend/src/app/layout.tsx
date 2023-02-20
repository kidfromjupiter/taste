"use client";
import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "./sidebar";
import { initializeFirebase } from "@/aux/firebase";
import { store } from "../aux/store";
import { Provider } from "react-redux";
import MessageLayer from "@/components/MessageLayer";
import { useEffect } from "react";
import { verifysession } from "@/aux/fetch/auth";
import { setAuth } from "@/aux/authSlice";
function getCookie(name: string) {
	function escape(s: string) {
		return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
	}
	var match = document.cookie.match(
		RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
	);
	return match ? match[1] : null;
}
export default function Layout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	initializeFirebase();
	useEffect(() => {
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
		<html lang="en" style={{ height: "100%" }}>
			<body className=" min-h-full margin-0">
				<div className=" ">
					<Provider store={store}>
						<ProSidebarProvider>
							<div className="flex-col md:flex-row flex ">
								<SideBar />

								<div className="w-full mt-16">
									<AnimatePresence mode="wait" initial={false}>
										{children}
									</AnimatePresence>
									<MessageLayer />
								</div>
							</div>
						</ProSidebarProvider>
					</Provider>
				</div>
			</body>
		</html>
	);
}
