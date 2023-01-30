import { FiSettings } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { ReactNode } from "react";
type sidebarMeta = {
	title: string;
	icon: ReactNode;
};
export const urls: Record<string, sidebarMeta> = {
	"/": {
		title: "Home",
		icon: <AiOutlineHome size={25} />,
	},
	"/settings": {
		title: "Settings",
		icon: <FiSettings size={25} />,
	},
	"/collections": {
		title: "Collections",
		icon: <BsBoxSeam size={25} />,
	},
	"/explore": {
		title: "Explore",
		icon: <BsBoxSeam size={25} />,
	},
	"/trackorders": {
		title: "Orders",
		icon: <TbTruckDelivery size={25} />,
	},
};

export const urlResolver = (url: string) => {
	return urls[url];
};
