
import * as admin from 'firebase-admin';
// Make sure to place your service account JSON file in the specified path
// For example, src/keys/firebase-service-account.json
// And ensure the alias '@/' is correctly configured in your tsconfig.json to point to 'src/'
import serviceAccount from '@/keys/firebase-service-account.json'; // This path is correct if the file exists at src/keys/

let app: admin.app.App | undefined = undefined;
let firestore: admin.firestore.Firestore | undefined = undefined;

// Check if Firebase Admin SDK has already been initialized
if (admin.apps.length === 0) {
  console.log('--- Firebase Admin Initialization Start (using direct JSON import) ---');
  try {
    // The type assertion `as admin.ServiceAccount` is used because direct JSON imports
    // might not have perfect type inference for the complex structure of the service account.
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log('SUCCESS: Firebase Admin SDK initialized successfully using direct JSON import.');
  } catch (error: any) {
    console.error('ERROR: Failed to initialize Firebase Admin SDK using direct JSON import.');
    console.error('Initialization Error details:', error.message);
    if (error.stack) {
      console.error('Error Stack:', error.stack);
    }
    // app remains undefined
  }
} else {
  app = admin.apps[0]!; // Use the existing app
  console.log('INFO: Using existing Firebase Admin SDK app instance.');
}

if (app) {
  firestore = admin.firestore(app); // Initialize Firestore with the specific app
  console.log('SUCCESS: Firestore instance created.');
} else {
  console.error('ERROR: Firebase Admin App is not initialized. Firestore will not be available.');
}

console.log('--- Firebase Admin Initialization End ---');
console.log('Current Firestore instance status in firebaseAdmin.ts:', firestore ? 'INITIALIZED' : 'NOT INITIALIZED');

export { firestore, app as firebaseAdminApp };
