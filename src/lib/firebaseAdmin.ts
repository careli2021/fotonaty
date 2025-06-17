
import * as admin from 'firebase-admin';
// Make sure to place your service account JSON file in the specified path
// For example, src/keys/firebase-service-account.json
// And ensure the alias '@/ ' is correctly configured in your tsconfig.json to point to 'src/'
import serviceAccountJson from '@/keys/firebase-service-account.json';

let app: admin.app.App | undefined = undefined;
let firestore: admin.firestore.Firestore | undefined = undefined;

// Check if Firebase Admin SDK has already been initialized
if (admin.apps.length === 0) {
  console.log('--- Firebase Admin Initialization Start (using direct JSON import) ---');
  try {
    // Map the snake_case properties from the JSON to the camelCase properties
    // expected by admin.credential.cert() and the admin.ServiceAccount interface.
    const serviceAccount: admin.ServiceAccount = {
      projectId: serviceAccountJson.project_id,
      clientEmail: serviceAccountJson.client_email,
      privateKey: serviceAccountJson.private_key,
    };

    console.log('Attempting to initialize Firebase Admin SDK with mapped service account:');
    console.log('Service Account Project ID:', serviceAccount.projectId);
    console.log('Service Account Client Email:', serviceAccount.clientEmail);
    // Do not log the full private key for security reasons, but confirm it's being passed
    console.log('Service Account Private Key: Present (length check not shown for security)');


    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
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
