
import * as admin from 'firebase-admin';

const serviceAccountJsonString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

// More detailed diagnostic logs
console.log('--- Firebase Admin Initialization Start ---');
if (serviceAccountJsonString && serviceAccountJsonString.length > 1) {
  console.log('SUCCESS: FIREBASE_SERVICE_ACCOUNT_JSON environment variable IS PRESENT.');
  console.log('Length of FIREBASE_SERVICE_ACCOUNT_JSON:', serviceAccountJsonString.length);
  const snippet = serviceAccountJsonString.substring(0, Math.min(100, serviceAccountJsonString.length));
  console.log('Snippet (first 100 chars or less):', snippet + (serviceAccountJsonString.length > 100 ? '...' : ''));
} else {
  console.error('ERROR: FIREBASE_SERVICE_ACCOUNT_JSON environment variable is MISSING or EMPTY.');
  console.log('Value of process.env.FIREBASE_SERVICE_ACCOUNT_JSON:', serviceAccountJsonString);
}

let app: admin.app.App | undefined = undefined;
let firestore: admin.firestore.Firestore | undefined = undefined;

if (serviceAccountJsonString) {
  if (admin.apps.length === 0) {
    try {
      console.log('Attempting to parse FIREBASE_SERVICE_ACCOUNT_JSON...');
      let serviceAccount = JSON.parse(serviceAccountJsonString);
      console.log('SUCCESS: Parsed FIREBASE_SERVICE_ACCOUNT_JSON.');
      console.log('Parsed serviceAccount object (type):', typeof serviceAccount);

      if (serviceAccount && typeof serviceAccount === 'object' && serviceAccount.project_id) {
        console.log('Parsed serviceAccount.project_id:', serviceAccount.project_id);
        
        // IMPORTANT: Fix for "Invalid PEM formatted message" by replacing escaped newlines
        if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
          console.log('Original private_key snippet (first 30 chars):', serviceAccount.private_key.substring(0,30) + '...');
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
          console.log('SUCCESS: Replaced escaped newlines in private_key.');
          console.log('Processed private_key snippet (first 30 chars):', serviceAccount.private_key.substring(0,30) + '...');
        } else {
          console.warn('WARNING: serviceAccount.private_key is missing or not a string.');
        }

      } else {
        console.warn('WARNING: Parsed serviceAccount does not appear to be a valid object or lacks project_id.');
      }

      console.log('Attempting to initialize Firebase Admin SDK with processed service account...');
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('SUCCESS: Firebase Admin SDK initialized successfully using FIREBASE_SERVICE_ACCOUNT_JSON.');
    } catch (error: any) {
      console.error('ERROR: Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON or initialize Firebase Admin SDK.');
      console.error('Parsing/Initialization Error details:', error.message);
      if (error.stack) {
        console.error('Error Stack:', error.stack);
      }
      if (error.message && (error.message.includes("INTERNAL") || error.message.includes("PEM"))) {
        console.error("PEM or INTERNAL Firebase error detected. This might be due to the service account key format (especially newlines in private_key) or an SDK issue.");
      }
      // Log the beginning of the string again if parsing failed, it might give a clue
      if (serviceAccountJsonString) {
        console.error('Attempted to parse (first 50 chars):', serviceAccountJsonString.substring(0, 50) + '...');
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

} else {
  console.warn(
    'WARNING: Firebase Admin SDK not initialized because FIREBASE_SERVICE_ACCOUNT_JSON is missing. Firestore operations will fail or use mock data.'
  );
}
console.log('--- Firebase Admin Initialization End ---');
console.log('Current Firestore instance status in firebaseAdmin.ts:', firestore ? 'INITIALIZED' : 'NOT INITIALIZED');


export { firestore, app as firebaseAdminApp };
