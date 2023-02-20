"use client";
import React, { useEffect, useState } from "react";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setAuth } from "@/aux/authSlice";
import { useRouter } from "next/navigation";
import { sendMessage, MessageType } from "@/aux/messagingSlice";
import { login } from "@/aux/fetch/auth";

type Props = {};
const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "/",
	signInOptions: [
		{
			provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			customParameters: {
				prompt: "select_account",
			},
		},
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
	],
	callbacks: {
		signInSuccessWithAuthResult: () => false,
	},
};
const Login = (props: Props) => {
	const auth: AuthState = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(async (user) => {
				if (!!user) {
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

		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);
	useEffect(() => {
		//send data to backend
		//set session cookies
		async function sendAuthData() {
			const response = await fetch("http://localhost:8000/api/auth/", {
				method: "POST",
				body: JSON.stringify(auth),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log(data);
		}
		if (auth.signedIn) {
			router.back();
		}
	}, [auth]);

	return (
		<div className="bg-emerald-700 flex justify-center items-center h-screen overflow-hidden flex-col">
			<h2 className="text-4xl font-bold text-emerald-500">Login</h2>
			<div className="shadow-lg bg-white py-5 my-10 rounded-md">
				<FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			</div>
		</div>
	);
};

export default Login;
