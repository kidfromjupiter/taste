"use client";
import { ReactElement, ReactNode, useState, useEffect } from "react";
import { urls } from "@/aux/urlResolver";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import profile from "../../public/profile.jpeg";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { AnimatePresence, motion } from "framer-motion";
import firebase from "firebase/compat/app";
import { useSelector, useDispatch } from "react-redux";
import { AuthState, logout } from "@/aux/authSlice";
import "firebase/compat/auth";
import { MessageType, sendMessage } from "@/aux/messagingSlice";
import { logout as logout_axios } from "@/aux/fetch/auth";

export default function SideBar() {
	const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
		useProSidebar();
	const [sidebarLinks, setSidebarLinks] = useState<ReactNode[] | null>(null);
	const [currentpathName, setCurrentpathName] = useState("");
	const [backButtonShown, setBackButtonShown] = useState(false);
	const [prefOpen, setPrefOpen] = useState(false);
	const user: AuthState = useSelector((state: any) => state.auth);
	const router = useRouter();

	const path = usePathname();

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
	useEffect(() => {
		const links = renderLinks();
		setSidebarLinks(links);
	}, [path]);

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
	return (
		<div className="relative">
			<Sidebar
				className=" text-gray-100  font-medium bg-emerald-700 relative "
				width="300px"
				breakPoint="md"
				backgroundColor="rgb(4 120 87)"
				defaultCollapsed={false}
			>
				<Menu
					className="bg-emerald-700 pb-5 mt-5"
					closeOnClick={true}
					menuItemStyles={{
						button: ({ level, active, disabled }) => {
							if (level === 0)
								return {
									backgroundColor: active ? "#059669" : undefined,
									// borderRadius: "0.5rem",
									boxShadow: active ? "0 4px 17px 0.1rem #05A875" : "initial",
									"&:hover": {
										backgroundColor: active ? "#059669" : "unset",
									},
								};
						},
					}}
				>
					{sidebarLinks?.map((element: ReactNode) => {
						return element;
					})}
				</Menu>
				<Menu
					className="mt-5 absolute bottom-0"
					menuItemStyles={{
						button: ({ level, active, disabled }) => {
							if (level === 0)
								return {
									"&:hover": {
										backgroundColor: "unset",
									},
								};
						},
					}}
				>
					<MenuItem
						icon={<CgMenuLeft size={30} />}
						component={<div onClick={() => collapseSidebar()} />}
					>
						{collapsed ? null : <div className=" ">Collapse</div>}
					</MenuItem>
				</Menu>
			</Sidebar>
			<div className="py-3 px-2 md:hidden flex flex-row items-center  z-50 bg-white border-b-slate-100 border-b-2 fixed w-full">
				<div className="flex flex-row justify-center items-center">
					{backButtonShown ? (
						<div className="pr-2" onClick={() => router.back()}>
							<FiChevronLeft size={28} />
						</div>
					) : null}

					<div onClick={() => toggleSidebar()}>
						<CgMenuLeft size={34} />
					</div>
				</div>
				<div className="px-3 font-medium text-xl flex-1 text-center">
					{currentpathName}
				</div>
				<div className="text-slate-700" onClick={() => setPrefOpen(!prefOpen)}>
					<AiOutlineSetting size={34} />
				</div>
			</div>
			<AnimatePresence>
				{prefOpen ? (
					<div
						className="h-screen w-full fixed top-16 right-0 z-50"
						onClick={() => setPrefOpen(false)}
					>
						{}
						<motion.div
							className=" bg-gray-100 shadow-lg rounded-lg absolute z-50 right-0 m-5 origin-top-right py-3 px-5"
							initial={{ opacity: 0, scale: 0 }}
							animate={{
								opacity: 1,
								scale: 1,
							}}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							exit={{ opacity: 0, scale: 0 }}
						>
							{user.signedIn && (
								<div className="py-3 flex justify-center">
									<div className="rounded-full flex justify-center items-center overflow-hidden h-16 w-16 mr-5 relative">
										<Image
											src={user.photoUrl || profile}
											alt="profile pic"
											fill={true}
											style={{ objectFit: "cover" }}
										/>
									</div>
									<div className="flex justify-center flex-col ">
										<div className="text-xl font-medium">
											Hi {user.displayName}
										</div>
										<div className="text-sm text-slate-500">{user.email}</div>
									</div>
								</div>
							)}

							<div className=" border-b-2 border-b-slate-200 ">
								{user.signedIn && (
									<Link href="/account">
										<div className="py-3 w-48">Account</div>
									</Link>
								)}

								<div className="py-3 w-48">Preferences</div>
								{user.signedIn ? (
									<div className="py-3 w-48" onClick={signOut}>
										Logout
									</div>
								) : (
									<Link href="/login">
										<div className="py-3 w-48">Login</div>
									</Link>
								)}
							</div>
							<div>
								<Link href="/cart">
									<div className="py-3 w-48">Cart</div>
								</Link>
								{user.signedIn && (
									<>
										<div className="py-3 w-48">Grocery list</div>

										<Link href="/orders">
											<div className="py-3 w-48">Orders</div>
										</Link>
									</>
								)}
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
