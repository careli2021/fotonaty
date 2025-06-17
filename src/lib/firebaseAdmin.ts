
import * as admin from 'firebase-admin';

const serviceAccountJsonString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

// Diagnostic log
console.log('FIREBASE_SERVICE_ACCOUNT_JSON in firebaseAdmin.ts:', 
  serviceAccountJsonString ? 'Loaded (length: ' + serviceAccountJsonString.length + ')' : 'NOT LOADED or EMPTY'
);
if (serviceAccountJsonString && serviceAccountJsonString.length < 50) {
  // Log a snippet if it's very short, might indicate it's not the full JSON
  console.log('Snippet of FIREBASE_SERVICE_ACCOUNT_JSON:', serviceAccountJsonString.substring(0, 50));
}


let app: admin.app.App | undefined = undefined;
let firestore: admin.firestore.Firestore | undefined = undefined;

if (serviceAccountJsonString) {
  if (admin.apps.length === 0) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJsonString);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error) {
      console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_JSON or initializing Firebase Admin SDK:', error);
      // app remains undefined
    }
  } else {
    app = admin.apps[0]!; // Use the existing app
    console.log('Using existing Firebase Admin SDK app instance.');
  }

  if (app) {
    firestore = admin.firestore(app); // Initialize Firestore with the specific app
    console.log('Firestore instance created.');
  } else {
    console.warn('Firebase Admin App initialization failed. Firestore will not be available.');
  }

} else {
  console.warn(
    'Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set. Firestore operations will fail.'
  );
}

export { firestore, app as firebaseAdminApp };
