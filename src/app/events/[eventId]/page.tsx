
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
  if (!firestore) {
    console.warn("Firestore instance is not available in getEventPhotosFromFirestore. Cannot fetch photos for eventId:", eventId);
    return [];
  }

  try {
    const photosSnapshot = await firestore
      .collection('eventPhotos')
      .where('eventId', '==', eventId)
      .orderBy('timestamp', 'desc')
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
        photographer: data.photographer || `Fotógrafo del Evento`, // Fallback
        timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
        favorites: Math.floor(Math.random() * 10), // Mock favorites for now
      };
    });
    console.log(`Fetched ${photos.length} photos from Firestore for eventId: ${eventId}`);
    return photos;
  } catch (error) {
    console.error('Error fetching photos from Firestore:', error);
    return [];
  }
}


export default async function EventPage({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId || 'sample-event';
  
  // La advertencia se mostrará si la instancia de Firestore no está disponible.
  const firestoreNotProperlyConfigured = !firestore;

  let photos: Photo[] = [];
  let eventName = `Evento ${eventId}`; // Default event name

  if (!firestoreNotProperlyConfigured) {
    photos = await getEventPhotosFromFirestore(eventId);
    // Podrías obtener el nombre del evento desde Firestore también si lo guardas allí
    // Por ahora, se mantiene el nombre basado en eventId o un mock.
  } else {
    console.warn(`Firestore not configured for event ${eventId}, photo gallery will be empty or show placeholders.`);
  }
  
  const eventDetailsFromFirestore = { // Simulación, podría expandirse para cargar desde Firestore
    name: eventName,
  };
  
  const bannerToDisplay = photos.length > 0 ? photos[0].url : `https://placehold.co/1200x300.png`;

  return (
    <div className="space-y-8">
      <EventDetailsHeader 
        name={eventDetailsFromFirestore.name} 
        bannerUrl={bannerToDisplay} 
        photoCount={photos.length} 
      />
      
      {firestoreNotProperlyConfigured && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md my-4" role="alert">
          <div className="flex">
            <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" /></div>
            <div>
              <p className="font-bold">Advertencia de Configuración</p>
              <p className="text-sm">La conexión con la base de datos (Firestore) no está configurada correctamente.</p>
              <p className="text-sm mt-1">Por favor, verifica que la variable de entorno `FIREBASE_SERVICE_ACCOUNT_JSON` esté correctamente definida en un archivo `.env.local` en la raíz de tu proyecto y que hayas reiniciado el servidor de desarrollo.</p>
              <p className="text-sm mt-1">La galería de fotos podría estar vacía o incompleta.</p>
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
        <EventChat />
      </div>
      
      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primary">Galería del Evento</h2>
        {photos.length > 0 ? (
          <PhotoGrid photos={photos} />
        ) : (
          !firestoreNotProperlyConfigured && <p className="text-center text-muted-foreground py-4">No se encontraron fotos para este evento en Firestore. Verifica que existan datos para el ID de evento: '{eventId}'.</p>
        )}
        {firestoreNotProperlyConfigured && photos.length === 0 && (
          <p className="text-center text-muted-foreground py-4">La galería está vacía porque la conexión con la base de datos (Firestore) no pudo ser establecida. Revisa la configuración.</p>
        )}
      </div>
    </div>
  );
}

