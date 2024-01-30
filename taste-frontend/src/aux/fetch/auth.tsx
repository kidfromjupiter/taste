import { axiosInstance } from "./axios";

export async function login(
	uid: string | null,
	displayName: string | null,
	idToken: string | null,
	email: string | null
) {
	const response = await axiosInstance.post(
		"/auth/login/",
		{
			uid,
			displayName,
			idToken,
			email,
		},
		{ withCredentials: true }
	);
	return response.data;
}

export async function verifysession() {
	const response = await axiosInstance.get("/auth/verifysession/", {
		withCredentials: true,
	});
	return response.data;
}

export async function logout() {
	const response = await axiosInstance.get("/auth/logout/", {
		withCredentials: true,
	});
	return response.data;
}
