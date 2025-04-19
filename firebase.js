import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase.config";

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export default app;
