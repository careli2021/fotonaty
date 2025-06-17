
import * as admin from 'firebase-admin';

const serviceAccountJsonString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

let app: admin.app.App | undefined = undefined;
let firestore: admin.firestore.Firestore | undefined = undefined;

if (serviceAccountJsonString) {
  if (admin.apps.length === 0) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJsonString);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_JSON or initializing Firebase Admin SDK:', error);
      // app remains undefined
    }
  } else {
    app = admin.apps[0]!; // Use the existing app
  }

  if (app) {
    firestore = admin.firestore(app); // Initialize Firestore with the specific app
  } else {
    console.warn('Firebase Admin App initialization failed. Firestore will not be available.');
  }

} else {
  console.warn(
    'Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set. Firestore operations will fail.'
  );
}

export { firestore, app as firebaseAdminApp };
