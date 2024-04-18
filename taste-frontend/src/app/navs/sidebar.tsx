"use client";
import { ReactElement, ReactNode, useState, useEffect } from "react";
import { urls } from "@/aux/urlResolver";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
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
	const [sidebarLinks, setSidebarLinks] = useState<ReactNode[] | null>(null);
	const [currentpathName, setCurrentpathName] = useState("");
	const [backButtonShown, setBackButtonShown] = useState(false);
	const [prefOpen, setPrefOpen] = useState(false);
	const user: AuthState = useSelector((state: any) => state.auth);
	const router = useRouter();
	const path = usePathname();
	const theme = useSelector((state: any) => state.theme.theme);
	const bgColor = theme === Theme.DARK ? "#064e3b" : "#047857";
	const renderLinks = () => {
		let links: Array<ReactElement> = [];
		let homeIndex: number = 0;
		for (const key in urls) {
			if (urls[key].sidebar === true) {
				if (path !== null && path.includes(key)) {
					setCurrentpathName(urls[key].title);
					if (path.split("/").length > 2) {
						setBackButtonShown(true);
					}

					if (key === "/") {
						links.push(
							<MenuItem
								component={<Link href={key} />}
								icon={urls[key].icon}
								key={key}
							>
								{urls[key].title}
							</MenuItem>
						);
					} else {
						links.push(
							<MenuItem
								active
								icon={urls[key].icon}
								component={<Link href={key} />}
								key={key}
							>
								{urls[key].title}
							</MenuItem>
						);
					}
				} else {
					links.push(
						<MenuItem
							component={<Link href={key} />}
							icon={urls[key].icon}
							key={key}
						>
							{urls[key].title}
						</MenuItem>
					);
				}
			} else {
				if (path !== null && path.includes(key)) {
					setCurrentpathName(urls[key].title);
					if (path.split("/").length > 2) {
						setBackButtonShown(true);
					}
				}
			}
		}
		return links;
	};

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
		// <div className="relative">
		// 	<Sidebar
		// 		className=" text-gray-100  font-medium bg-emerald-700 dark:bg-emerald-900 relative "
		// 		width="300px"
		// 		breakPoint="md"
		// 		backgroundColor={bgColor}
		// 		defaultCollapsed={false}
		// 	>
		// 		<Menu
		// 			className="bg-emerald-700 pb-5 mt-5 dark:bg-emerald-900"
		// 			closeOnClick={true}
		// 			menuItemStyles={{
		// 				button: ({ level, active, disabled }) => {
		// 					if (level === 0)
		// 						return {
		// 							backgroundColor: active ? "#059669" : undefined,
		// 							// borderRadius: "0.5rem",
		// 							boxShadow: active ? "0 4px 17px 0.1rem #05A875" : "initial",
		// 							"&:hover": {
		// 								backgroundColor: active ? "#059669" : "unset",
		// 							},
		// 						};
		// 				},
		// 			}}
		// 		>
		// 			{sidebarLinks?.map((element: ReactNode) => {
		// 				return element;
		// 			})}
		// 		</Menu>
		// 		<Menu
		// 			className="mt-5 absolute bottom-0"
		// 			menuItemStyles={{
		// 				button: ({ level, active, disabled }) => {
		// 					if (level === 0)
		// 						return {
		// 							"&:hover": {
		// 								backgroundColor: "unset",
		// 							},
		// 						};
		// 				},
		// 			}}
		// 		>
		// 			<MenuItem
		// 				icon={
		// 					theme != "dark" && collapsed == true ? (
		// 						<BsSun size={22} />
		// 					) : collapsed == true ? (
		// 						<BsMoon size={22} />
		// 					) : null
		// 				}
		// 				onClick={() =>
		// 					theme == "dark"
		// 						? dispatch(setTheme({ theme: Theme.LIGHT }))
		// 						: dispatch(setTheme({ theme: Theme.DARK }))
		// 				}
		// 			>
		// 				{!collapsed && (
		// 					<div className="h-16 flex flex-row items-center justify-between">
		// 						<div className="py-3 font-semibold px-2">Switch theme</div>
		// 						<div className="rounded-full bg-emerald-900 dark:bg-emerald-700 flex justify-center items-center">
		// 							<div
		// 								className={`p-2 m-1 rounded-full ${theme != "dark" && "bg-emerald-800"
		// 									}`}
		// 								onClick={() => {
		// 									dispatch(setTheme({ theme: Theme.LIGHT }));
		// 								}}
		// 							>
		// 								<BsSun size={22} />
		// 							</div>
		// 							<div
		// 								className={`p-2 m-1 rounded-full ${theme == "dark" && "bg-emerald-800"
		// 									}`}
		// 								onClick={() => {
		// 									dispatch(setTheme({ theme: Theme.DARK }));
		// 								}}
		// 							>
		// 								<BsMoon size={22} />
		// 							</div>
		// 						</div>
		// 					</div>
		// 				)}
		// 			</MenuItem>
		// 			<MenuItem
		// 				icon={<CgMenuLeft size={30} />}
		// 				component={<div onClick={() => collapseSidebar()} />}
		// 			>
		// 				{collapsed ? null : <div className=" ">Collapse</div>}
		// 			</MenuItem>
		// 		</Menu>
		// 	</Sidebar>
		// 	<div className="py-3 px-2 md:hidden flex flex-row items-center  z-50 bg-white border-b-slate-100 border-b-2 fixed w-full dark:bg-neutral-900 dark:border-b-neutral-800 dark:text-gray-50">
		// 		<div className="flex flex-row justify-center items-center">
		// 			{backButtonShown ? (
		// 				<div className="pr-2" onClick={() => router.back()}>
		// 					<FiChevronLeft size={28} />
		// 				</div>
		// 			) : null}

		// 			<div onClick={() => toggleSidebar()}>
		// 				<CgMenuLeft size={34} />
		// 			</div>
		// 		</div>
		// 		<div className="px-3 font-medium text-xl flex-1 text-center">
		// 			{currentpathName}
		// 		</div>
		// 		<div
		// 			className="text-slate-700 dark:text-gray-50"
		// 			onClick={() => setPrefOpen(!prefOpen)}
		// 		>
		// 			<AiOutlineSetting size={34} />
		// 		</div>
		// 	</div>
		// 	<AnimatePresence>
		// 		{prefOpen ? (
		// 			MobilePrefMenu({ signOut, user, setPrefOpen })
		// 		) : null}
		// 	</AnimatePresence>
		// </div>
		<div className="px-3 py-5">
			{Object.keys(urls).map((url) => {
				if (urls[url].sidebar) {
					return (
						<div
							key={url}
							className="py-3 flex hover:cursor-pointer"
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
	);
}
