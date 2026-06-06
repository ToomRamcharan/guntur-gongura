import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let adminApp;
let adminAuth;
let adminDb;

export async function getAdmin() {
  if (!adminApp) {
    if (firebaseConfig && firebaseConfig.projectId !== "remixed-project-id") {
      adminApp = initializeApp({
        projectId: firebaseConfig.projectId,
      });
    } else {
      return null;
    }
  }
  
  if (!adminAuth) adminAuth = getAuth(adminApp);
  if (!adminDb) adminDb = getFirestore(adminApp);
  
  return { adminAuth, adminDb };
}

