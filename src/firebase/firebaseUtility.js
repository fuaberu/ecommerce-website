import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC2rA0_cfY3SZLTyi7EAdUs-EmPLiReA48',
	authDomain: 'my-ecommerce-3ce47.firebaseapp.com',
	projectId: 'my-ecommerce-3ce47',
	storageBucket: 'my-ecommerce-3ce47.appspot.com',
	messagingSenderId: '532861101684',
	appId: '1:532861101684:web:896037147225749dd21321',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

// google sign In
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// users profiles
export const handleUserProfile = async (usersAuth, additionalData) => {
	if (!usersAuth) return;
	const { uid } = usersAuth;

	const userRef = db.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		// if user do not exist
		const { displayName, email } = usersAuth;
		const time = new Date();
		try {
			userRef.set({
				displayName,
				email,
				time,
				...additionalData,
			});
		} catch (error) {
			console.log(error);
		}
	}
	return userRef;
};

