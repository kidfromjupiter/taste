import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
	apiKey: "AIzaSyAibVNYJnyk8x51p5-EzRTPh8HWNLlKv3I",
	authDomain: "taste-7ae21.firebaseapp.com",
	projectId: "taste-7ae21",
	storageBucket: "taste-7ae21.appspot.com",
	messagingSenderId: "307864130467",
	appId: "1:307864130467:web:6f7f65cf4f9acdf6d80016",
	measurementId: "G-6XH9P64SWN",
};
export const initializeFirebase = () => {
	firebase.initializeApp(firebaseConfig);
};
