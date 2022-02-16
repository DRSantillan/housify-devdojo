import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCjmzcg4pCLROolq5pyU8a8q_XAiMXszwQ',
	authDomain: 'housify-devdojo-22.firebaseapp.com',
	projectId: 'housify-devdojo-22',
	storageBucket: 'housify-devdojo-22.appspot.com',
	messagingSenderId: '680844097296',
	appId: '1:680844097296:web:ca07473a7335714fc35795',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
