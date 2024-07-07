import { AuthState } from "@/aux/authSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import profile from "../../../public/profile.jpeg";
type Props = {
	signOut: () => void;
	user: AuthState;
	setPrefOpen: (arg0: boolean) => void;

}
export default function MobilePrefMenu({ signOut, user, setPrefOpen }: Props) {
	return (<div
		className="h-screen w-full fixed top-16 right-0 z-50 "
		onClick={() => setPrefOpen(false)}
	>
		{ }
		<motion.div
			className=" bg-gray-100 shadow-lg rounded-lg absolute z-50 right-0 m-5 origin-top-right py-3 px-5 dark:bg-neutral-700 dark:text-gray-50 dark:shadow-neutral-900"
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
						<div className="text-sm text-slate-500 dark:text-neutral-400">
							{user.email}
						</div>
					</div>
				</div>
			)}

			<div className=" border-b-2 border-b-slate-200 dark:border-b-neutral-600">
				{user.signedIn && (
					<Link href="/account">
						<div className="py-3 w-48">Account</div>
					</Link>
				)}

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
	</div>)
}