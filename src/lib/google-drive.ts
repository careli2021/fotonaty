
'use server';

import { google } from 'googleapis';

export async function getDriveFileIds(folderId: string): Promise<string[]> {
  try {
    const serviceAccountJsonString = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJsonString) {
      console.error('Error: GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
      return [];
    }

    let credentials;
    try {
      credentials = JSON.parse(serviceAccountJsonString);
    } catch (e) {
      console.error('Error: Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Ensure it is a valid JSON string.', e);
      return [];
    }
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'image/' or mimeType contains 'video/') and trashed = false`,
      fields: 'files(id, name)',
      orderBy: 'createdTime desc', // Get newest files first
      pageSize: 100, // Max 100 for Drive API v3 files.list without pageToken handling
    });

    const files = res.data.files;
    if (files && files.length) {
      return files.map((file) => file.id).filter((id): id is string => !!id);
    } else {
      console.log('No files found in the specified folder or folder is not accessible with provided credentials.');
      return [];
    }
  } catch (error: any) {
    console.error('Error fetching files from Google Drive:');
    // Attempt to log more detailed error information from Google API
    if (error.response && error.response.data && error.response.data.error) {
        console.error('API Error Details:', JSON.stringify(error.response.data.error, null, 2));
    } else if (error.errors && Array.isArray(error.errors)) { 
        console.error('API Error Details:', JSON.stringify(error.errors, null, 2));
    } else {
        console.error(error.message || error);
    }
    return [];
  }
}
