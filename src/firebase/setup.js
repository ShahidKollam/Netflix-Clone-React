import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMQADV2VDWCNcbEut9W6lRpd2ndr6vx9o",
  authDomain: "netflix-clone-161f3.firebaseapp.com",
  projectId: "netflix-clone-161f3",
  storageBucket: "netflix-clone-161f3.appspot.com",
  messagingSenderId: "582763965006",
  appId: "1:582763965006:web:c71e2c5ff466d33bdf711f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
