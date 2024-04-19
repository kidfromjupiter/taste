import {
	AiOutlineHome,
	AiOutlineAppstore,
	AiOutlineUser,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { ReactNode } from "react";
type sidebarMeta = {
	title: string;
	icon?: ReactNode;
	sidebar: boolean;
};
export const urls: Record<string, sidebarMeta> = {
	"/": {
		title: "Home",
		icon: <AiOutlineHome size={25} />,
		sidebar: true,
	},
	"/collections": {
		title: "Collections",
		icon: <AiOutlineAppstore size={25} />,
		sidebar: true,
	},
	"/orders": {
		title: "Orders",
		sidebar: true,
		icon: <TbTruckDelivery size={25} />,
	},
	"/cart": {
		title: "Cart",
		sidebar: true,
		icon: <AiOutlineShoppingCart size={25} />,
	},
	"/account": {
		title: "Account",
		sidebar: true,
		icon: <AiOutlineUser size={25} />,
	},
	"/comingsoon": {
		title: "Coming Soon",
		sidebar: false,
	},
};

export const urlResolver = (url: string) => {
	return urls[url];
};
