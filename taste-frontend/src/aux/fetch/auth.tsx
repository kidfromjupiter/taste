import { axiosInstance } from "./axios";

export async function login(
	uid: string | null,
	displayName: string | null,
	idToken: string | null,
	email: string | null
) {
	const response = await axiosInstance.post(
		"/api/auth/login/",
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
	const response = await axiosInstance.get("/api/auth/verifysession/", {
		withCredentials: true,
	});
	return response.data;
}

export async function logout() {
	const response = await axiosInstance.get("/api/auth/logout/", {
		withCredentials: true,
	});
	return response.data;
}
