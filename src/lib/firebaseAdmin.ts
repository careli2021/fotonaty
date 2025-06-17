
import * as admin from 'firebase-admin';

const serviceAccountJsonString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountJsonString) {
  console.warn(
    'Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set. Firestore operations will fail.'
  );
}

let app: admin.app.App;

if (admin.apps.length === 0 && serviceAccountJsonString) {
  try {
    const serviceAccount = JSON.parse(serviceAccountJsonString);
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_JSON or initializing Firebase Admin SDK:', error);
  }
} else if (admin.apps.length > 0) {
  app = admin.apps[0]!;
}

const firestore = admin.firestore();
export { firestore, app as firebaseAdminApp };
