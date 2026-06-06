import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// In AI Studio, firebase-applet-config.json is generated in the root
const isConfigured = firebaseConfig && firebaseConfig.projectId !== "remixed-project-id";

// Standard fallback for unconfigured state
const fallbackConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

const app = !getApps().length 
  ? initializeApp(isConfigured ? firebaseConfig : fallbackConfig) 
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

