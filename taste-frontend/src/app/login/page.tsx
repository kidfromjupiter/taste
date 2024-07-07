"use client";
import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "@/aux/authSlice";
import { useRouter } from "next/navigation";
import { sendMessage, MessageType } from "@/aux/messagingSlice";
import { login } from "@/aux/fetch/auth";

const Login = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(async (user) => {
				if (user) {
					const idToken = await user.getIdToken();
					dispatch(
						setAuth({
							displayName: user.displayName,
							email: user.email,
							photoUrl: user.photoURL,
							signedIn: true,
							uid: user.uid,
							emailVerified: user.emailVerified,
						})
					);
					dispatch(
						sendMessage({
							type: MessageType.SUCCESS,
							message: "Log in successful",
						})
					);
					login(user.uid, user.displayName, idToken, user.email);
				}
			});

		return () => unregisterAuthObserver();
	}, [dispatch]);

	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	return (
		<div className=" flex justify-center items-center h-screen overflow-hidden flex-col w-full p-10">
			<h2 className="text-4xl font-bold text-neutral-700 dark:text-neutral-400">
				Login
			</h2>
			<div
				className="shadow-lg bg-black px-3  py-5 my-10 rounded-md hover:cursor-pointer text-white"
				onClick={signInWithGoogle}
			>
				Sign in with Google
			</div>
		</div>
	);
};

export default Login;
