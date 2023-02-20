import { FiSettings } from "react-icons/fi";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
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
	"/explore": {
		title: "Explore",
		icon: <BsBoxSeam size={25} />,
		sidebar: true,
	},
	"/orders": {
		title: "Orders",
		sidebar: false,
	},
	"/cart": {
		title: "Cart",
		sidebar: false,
	},
	"/account": {
		title: "Account",
		sidebar: false,
	},
	"/comingsoon": {
		title: "Coming Soon",
		sidebar: false,
	},
};

export const urlResolver = (url: string) => {
	return urls[url];
};
