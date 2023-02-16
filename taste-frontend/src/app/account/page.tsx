"use client";
import React from "react";
import Image from "next/image";
import profile from "../../../public/profile.jpeg";
import ArrowClickableSection from "@/components/ArrowClickableSection";
import { useRouter } from "next/navigation";
import AccountEditButton from "@/components/AccountEditButton";
import { BsCreditCard2Front } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RiShoppingBag2Line } from "react-icons/ri";
import { EditAccountTypes } from "./edit/page";
import FramerWrapper from "@/components/FramerWrapper";
type Props = {};

const AccountPage = (props: Props) => {
	const router = useRouter();
	return (
		<FramerWrapper>
			<div>
				<div className="flex flex-col items-center justify-center bg-slate-100 text-gray-600 py-10">
					<div className="rounded-full flex justify-center items-center overflow-hidden h-24 w-24 m-3 relative">
						<Image
							src={profile}
							alt="profile pic"
							fill={true}
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="font-semibold text-lg">John Smith</div>
					<div className="text-sm">john@smith.com</div>
				</div>

				<div className="py-5 px-2 ">
					<div className="flex flex-col mb-3">
						<h3 className="text-2xl font-bold mb-3 ">Suggested</h3>
						<div className="flex flex-col my-3">
							<ArrowClickableSection
								text="Complete account info"
								onClick={() =>
									router.push(
										`/account/edit?type=${EditAccountTypes.ACCOUNT_INFO}`
									)
								}
								className="text-md px-3 mb-5"
							/>
							<ArrowClickableSection
								text="Setup one-click purchase"
								onClick={() =>
									router.push(`/account/edit?type=${EditAccountTypes.PAYMENT}`)
								}
								className="text-md px-3 mb-5"
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 grid-flow-row gap-2">
						<AccountEditButton
							text="Payment info"
							icon={<BsCreditCard2Front size={34} />}
							onClick={() =>
								router.push(`/account/edit?type=${EditAccountTypes.PAYMENT}`)
							}
						/>
						<AccountEditButton
							text="Delivery info"
							icon={<TbTruckDelivery size={34} />}
							onClick={() =>
								router.push(`/account/edit?type=${EditAccountTypes.ADDRESS}`)
							}
						/>
						<AccountEditButton
							text="Grocery subscriptions"
							icon={<RiShoppingBag2Line size={34} />}
							onClick={() => router.push(`/comingsoon`)}
						/>
					</div>
				</div>
			</div>
		</FramerWrapper>
	);
};

export default AccountPage;
