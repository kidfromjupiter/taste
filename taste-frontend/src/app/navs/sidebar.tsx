"use client";
import { ReactElement, ReactNode, useState, useEffect } from "react";
import { urls } from "@/aux/urlResolver";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import { FiChevronLeft } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { AnimatePresence } from "framer-motion";
import firebase from "firebase/compat/app";
import { useSelector, useDispatch } from "react-redux";
import { AuthState, logout } from "@/aux/authSlice";
import "firebase/compat/auth";
import { MessageType, sendMessage } from "@/aux/messagingSlice";
import { logout as logout_axios } from "@/aux/fetch/auth";
import { BsSun, BsMoon } from "react-icons/bs";
import { setTheme, Theme } from "@/aux/themeSlice";
import MobilePrefMenu from "./mobilePrefMenu";

export default function SideBar() {
	// const { collapseSidebar, toggleSidebar, collapsed } = useProSidebar();
	const [currentpathName, setCurrentpathName] = useState("");
	const [backButtonShown, setBackButtonShown] = useState(false);
	const [prefOpen, setPrefOpen] = useState(false);
	const user: AuthState = useSelector((state: any) => state.auth);
	const router = useRouter();
	const path = usePathname();
	const theme = useSelector((state: any) => state.theme.theme);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const dispatch = useDispatch();
	const signOut = () => {
		firebase.auth().signOut();
		dispatch(logout());
		dispatch(
			sendMessage({
				message: "Signed out successfully",
				type: MessageType.INFO,
			})
		);
		logout_axios();
	};
	useEffect(() => {
		//setting initial theme
		if (localStorage.getItem("theme") == "dark") {
			dispatch(setTheme({ theme: Theme.DARK }));
		}
		console.log("ran this first");
	}, []);
	useEffect(() => {
		//changing theme
		if (theme == "dark") {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else if (theme == "light") {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [theme]);

	return (
		//
		<>
			<div
				className={`${
					sidebarOpen ? "translate-x-0" : "-translate-x-60"
				}  transition-all md:translate-x-0  absolute px-3 py-5 md:relative md:flex flex-col justify-between h-screen  border-r-[1px] border-neutral-100 dark:border-neutral-700 z-50 dark:bg-neutral-900 bg-neutral-50`}
			>
				<div className="flex flex-col justify-between h-full">
					<div className="grid grid-flow-row gap-2">
						{Object.keys(urls).map((url) => {
							if (urls[url].sidebar) {
								return (
									<div
										key={url}
										className={`${
											path == url ? "dark:bg-neutral-700 bg-neutral-100" : ""
										} py-3 pl-3 pr-7 flex hover:cursor-pointer hover:bg-neutral-200 rounded-md
								dark:hover:bg-neutral-800 dark:text-gray-50`}
										onClick={() => router.push(url)}
									>
										{urls[url].sidebar && (
											<div className="px-3">{urls[url].icon}</div>
										)}

										<div>{urls[url].title}</div>
									</div>
								);
							}
							return null;
						})}
					</div>
					<div>
						<div className=" flex flex-col items-center justify-between">
							<div className="py-3 font-semibold px-2">Switch theme</div>
							<div className="rounded-full  dark:bg-neutral-700 flex justify-center items-center">
								<div
									className={`p-2 m-1 rounded-full ${
										theme != "dark" && "bg-neutral-300"
									}`}
									onClick={() => {
										dispatch(setTheme({ theme: Theme.LIGHT }));
									}}
								>
									<BsSun size={22} />
								</div>
								<div
									className={`p-2 m-1 rounded-full ${
										theme == "dark" && "bg-neutral-800"
									}`}
									onClick={() => {
										dispatch(setTheme({ theme: Theme.DARK }));
									}}
								>
									<BsMoon size={22} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={() => setSidebarOpen(false)}
				className={`${
					sidebarOpen ? "block" : "hidden"
				} md:hidden transition-all bg-black opacity-60 h-screen w-screen absolute z-40 m-auto`}
			></div>
			<div className="py-3 px-2 md:hidden flex flex-row items-center h-16  z-30 bg-white border-b-slate-100 border-b-2 fixed w-full dark:bg-neutral-900 dark:border-b-neutral-800 dark:text-gray-50">
				<div className="flex flex-row justify-center items-center">
					{backButtonShown ? (
						<div className="pr-2" onClick={() => router.back()}>
							<FiChevronLeft size={28} />
						</div>
					) : null}

					<div onClick={() => setSidebarOpen(!sidebarOpen)}>
						<CgMenuLeft size={34} />
					</div>
				</div>
				<div className="px-3 font-medium text-xl flex-1 text-center">
					{currentpathName}
				</div>
				<div
					className="text-slate-700 dark:text-gray-50"
					onClick={() => setPrefOpen(!prefOpen)}
				>
					<AiOutlineSetting size={34} />
				</div>
			</div>
			<AnimatePresence>
				{prefOpen ? MobilePrefMenu({ signOut, user, setPrefOpen }) : null}
			</AnimatePresence>
		</>
	);
}
