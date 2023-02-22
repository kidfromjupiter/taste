"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import profile from "../../../../public/profile.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import FormInput from "@/components/FormInput";
import FramerWrapper from "@/components/FramerWrapper";
import { useSelector } from "react-redux";
import { AuthState } from "@/aux/authSlice";
import { EditAccountTypes } from "./types";

type Props = {};

const EditAccountInfo = (props: Props) => {
	const params = useSearchParams();
	const __type = params.get("type");
	const [type, setType] = useState(parseInt(__type || "0"));
	const user: AuthState = useSelector((state: any) => state.auth);
	const exitAnimation = {
		opacity: 0,
		y: -50,
	};
	const initial = {
		opacity: 0,
		y: 50,
	};
	const animate = {
		opacity: 1,
		y: 0,
	};
	return (
		<FramerWrapper>
			<div className="px-3 flex flex-col h-screen">
				<div className="flex items-center my-5 ">
					<div className="rounded-full flex justify-center items-center overflow-hidden h-20 w-20 m-3 relative ">
						<Image
							src={user.photoUrl || profile}
							alt="profile pic"
							fill={true}
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="flex flex-col text-gray-600 dark:text-zinc-300">
						<div className="font-semibold text-xl">{user.displayName}</div>
						<div className="text-sm">{user.email}</div>
					</div>
				</div>
				<div className="mb-5 font-semibold text-lg dark:text-gray-50">
					Complete account setup to start ordering
				</div>
				<div className="flex w-full justify-evenly text-lg font-semibold border-b-slate-100 border-b-2 dark:border-b-neutral-800">
					<div
						className={`${
							(type && type === EditAccountTypes.ACCOUNT_INFO) ||
							type === EditAccountTypes.DEFAULT
								? "text-emerald-700 underline decoration-emerald-700 underline-offset-8 decoration-2"
								: "text-slate-400"
						}`}
						onClick={() => setType(EditAccountTypes.ACCOUNT_INFO)}
					>
						Profile
					</div>
					<div
						className={`${
							type && type === EditAccountTypes.PAYMENT
								? "text-emerald-700 underline decoration-emerald-700 underline-offset-8 decoration-2"
								: "text-slate-400"
						}`}
						onClick={() => setType(EditAccountTypes.PAYMENT)}
					>
						Payment info
					</div>
					<div
						className={`${
							type && type === EditAccountTypes.ADDRESS
								? "text-emerald-700 underline decoration-emerald-700 underline-offset-8 decoration-2"
								: "text-slate-400"
						}`}
						onClick={() => setType(EditAccountTypes.ADDRESS)}
					>
						Delivery info
					</div>
				</div>
				<AnimatePresence mode="wait" initial={false}>
					<div
						className="flex justify-center items-center mt-10 flex-col 
					h-full "
					>
						{(type && type === EditAccountTypes.DEFAULT) ||
						type === EditAccountTypes.ACCOUNT_INFO ? (
							<motion.div
								key={EditAccountTypes.ACCOUNT_INFO}
								initial={initial}
								animate={animate}
								exit={exitAnimation}
							>
								<FormInput
									onChange={(e) => console.log(e)}
									label="First name"
								/>
								<FormInput onChange={(e) => console.log(e)} label="Last name" />
								<FormInput
									onChange={(e) => console.log(e)}
									label="Mobile number"
									helpText="This is only used for verification purposes"
								/>
							</motion.div>
						) : null}
						{type && type === EditAccountTypes.PAYMENT ? (
							<motion.div
								key={EditAccountTypes.PAYMENT}
								initial={initial}
								animate={animate}
								exit={exitAnimation}
							>
								<div>Card information</div>
							</motion.div>
						) : null}
						{type && type === EditAccountTypes.ADDRESS ? (
							<motion.div
								key={EditAccountTypes.ADDRESS}
								initial={initial}
								animate={animate}
								exit={exitAnimation}
								className="grid grid-flow-row gap-4 overflow-auto"
							>
								<FormInput
									onChange={(e) => console.log(e)}
									label="Postal code"
								/>
								<FormInput
									onChange={(e) => console.log(e)}
									label="Address line 1"
								/>
								<FormInput
									onChange={(e) => console.log(e)}
									label="Address line 2"
								/>
								<FormInput onChange={(e) => console.log(e)} label="City" />
								<FormInput onChange={(e) => console.log(e)} label="Country" />
							</motion.div>
						) : null}
					</div>
				</AnimatePresence>
				<div className="flex pb-5 pt-2  bottom-0 mx-auto bg-gray-50 w-full justify-center items-center dark:bg-neutral-900">
					{(type && type === EditAccountTypes.DEFAULT) ||
					type === EditAccountTypes.ACCOUNT_INFO ? null : (
						<div
							className="px-6 mx-3 py-3 text-emerald-700"
							onClick={() => setType(type - 1)}
						>
							Go Back
						</div>
					)}
					{type && type === EditAccountTypes.ADDRESS ? (
						<div className="px-6 mx-3 py-3 text-white  bg-gradient-to-tr from-emerald-400 to-sky-600 rounded-md">
							Save
						</div>
					) : (
						<div
							className="px-6 mx-4 py-3 text-white bg-emerald-700"
							onClick={() => setType(type + 1)}
						>
							Next
						</div>
					)}
				</div>
			</div>
		</FramerWrapper>
	);
};

export default EditAccountInfo;
