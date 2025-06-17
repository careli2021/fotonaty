
import { EventDetailsHeader } from '@/components/event/event-details-header';
import { PhotoGrid } from '@/components/event/photo-grid';
import { EventChat } from '@/components/event/event-chat';
import { Button } from '@/components/ui/button';
import { Film, MessageSquare, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SlideshowModal } from '@/components/event/slideshow-modal';
import type { Photo } from '@/components/event/photo-item';
import { firestore } from '@/lib/firebaseAdmin'; // Import initialized Firestore admin instance

const googleDriveBaseUrl = 'https://drive.google.com/uc?export=download&id=';

async function getEventPhotosFromFirestore(eventId: string): Promise<Photo[]> {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.warn("Firestore not configured for event page. FIREBASE_SERVICE_ACCOUNT_JSON is missing.");
    return []; // Return empty or mock data if Firestore isn't configured
  }
  try {
    const photosSnapshot = await firestore
      .collection('eventPhotos')
      .where('eventId', '==', eventId)
      .orderBy('timestamp', 'desc') // Assuming you have a timestamp field for ordering
      .get();

    if (photosSnapshot.empty) {
      console.log('No photos found in Firestore for eventId:', eventId);
      return [];
    }

    const photos: Photo[] = photosSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        url: `${googleDriveBaseUrl}${data.driveFileId}`,
        photographer: data.photographer || `Evento ${eventId}`, // Fallback photographer
        timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
        favorites: Math.floor(Math.random() * 10), // Mock favorites for now
      };
    });
    return photos;
  } catch (error) {
    console.error('Error fetching photos from Firestore:', error);
    return []; // Return empty array on error
  }
}


export default async function EventPage({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId || 'sample-event';
  
  // For mockEvent, we can keep some static data or also fetch it from Firestore if needed
  const mockEvent = {
    id: eventId,
    name: `Evento ${eventId}`, 
    // Banner could also come from Firestore or be a default
    bannerUrl: `${googleDriveBaseUrl}1d0bMVmSk2pMe6S3ZgG0bKeSPS_Yfd9Ul`, // Using one of the provided IDs as a default banner
    colorScheme: { primary: '#A020F0', accent: '#008080' },
  };

  const photos = await getEventPhotosFromFirestore(eventId);
  
  // If Firestore isn't configured, show a warning and maybe some placeholder photos.
  const firestoreNotConfigured = !process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  // Determine banner: use first photo from Firestore if available, else default mockEvent banner.
  const bannerToDisplay = photos.length > 0 ? photos[0].url : mockEvent.bannerUrl;


  return (
    <div className="space-y-8">
      <EventDetailsHeader name={mockEvent.name} bannerUrl={bannerToDisplay} photoCount={photos.length} />
      
      {firestoreNotConfigured && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
          <div className="flex">
            <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" /></div>
            <div>
              <p className="font-bold">Advertencia de Configuración</p>
              <p className="text-sm">La integración con Firestore no está completamente configurada (falta `FIREBASE_SERVICE_ACCOUNT_JSON`). Mostrando datos de muestra o galería vacía.</p>
            </div>
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="flex justify-center gap-4">
          <SlideshowModal photos={photos} trigger={
              <Button variant="outline" size="lg">
                  <Film className="mr-2 h-5 w-5" />
                  Iniciar Slideshow
              </Button>
          }/>
        </div>
      )}

      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primary flex items-center">
            <MessageSquare className="mr-3 h-7 w-7" />
            Muro del Evento y Chat
        </h2>
        <EventChat /> {/* EventChat is client-side and remains as is */}
      </div>
      
      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primary">Galería del Evento</h2>
        {photos.length > 0 ? (
          <PhotoGrid photos={photos} />
        ) : (
          !firestoreNotConfigured && <p className="text-center text-muted-foreground">No se encontraron fotos para este evento en Firestore.</p>
        )}
      </div>
    </div>
  );
}
