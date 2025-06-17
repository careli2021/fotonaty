
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
  // La verificación de la configuración de Firebase Admin SDK se hace en firebaseAdmin.ts
  // Si firestore no está disponible, la función simplemente retornará un array vacío.
  if (!firestore) {
    console.warn("Firestore instance is not available. Cannot fetch photos for eventId:", eventId);
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
    return photos;
  } catch (error) {
    console.error('Error fetching photos from Firestore:', error);
    return [];
  }
}


export default async function EventPage({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId || 'sample-event';
  
  const eventDetailsFromFirestore = { // Simulación de carga de detalles del evento desde Firestore
    name: `Evento ${eventId}`, 
    // El banner podría venir de Firestore o ser una foto específica de la galería.
    // Por ahora, usaremos una imagen por defecto o la primera foto de la galería.
    colorScheme: { primary: '#A020F0', accent: '#008080' },
  };
  
  const photos = await getEventPhotosFromFirestore(eventId);
  
  // La advertencia se mostrará si la instancia de Firestore no está disponible (manejado en firebaseAdmin.ts)
  // o si la variable de entorno no está configurada.
  const firestoreNotProperlyConfigured = !firestore;


  // Determinar banner: usar primera foto de Firestore si disponible, sino un placeholder.
  const bannerToDisplay = photos.length > 0 ? photos[0].url : `https://placehold.co/1200x300.png`;


  return (
    <div className="space-y-8">
      <EventDetailsHeader 
        name={eventDetailsFromFirestore.name} 
        bannerUrl={bannerToDisplay} 
        photoCount={photos.length} 
      />
      
      {firestoreNotProperlyConfigured && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
          <div className="flex">
            <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" /></div>
            <div>
              <p className="font-bold">Advertencia de Configuración</p>
              <p className="text-sm">La integración con Firestore no está completamente configurada (falta `FIREBASE_SERVICE_ACCOUNT_JSON` o hay un error de inicialización). Mostrando datos de muestra o galería vacía.</p>
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
        <EventChat /> {/* EventChat es client-side y permanece como is */}
      </div>
      
      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primary">Galería del Evento</h2>
        {photos.length > 0 ? (
          <PhotoGrid photos={photos} />
        ) : (
          !firestoreNotProperlyConfigured && <p className="text-center text-muted-foreground">No se encontraron fotos para este evento en Firestore, o Firestore no está configurado.</p>
        )}
      </div>
    </div>
  );
}
