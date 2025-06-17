
import { EventDetailsHeader } from '@/components/event/event-details-header';
import { PhotoGrid } from '@/components/event/photo-grid';
import { EventChat } from '@/components/event/event-chat';
import { Button } from '@/components/ui/button';
import { Film, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SlideshowModal } from '@/components/event/slideshow-modal';
import { getDriveFileIds } from '@/lib/google-drive';

// Banner image can be a specific one or the first from the dynamic list later
const defaultBannerImageId = '1d0bMVmSk2pMe6S3ZgG0bKeSPS_Yfd9Ul'; 
const googleDriveBaseUrl = 'https://drive.google.com/uc?export=download&id=';

const fallbackPhotoIds = [ // Used if Drive fetch fails or FOLDER_ID is not set
  '1d0bMVmSk2pMe6S3ZgG0bKeSPS_Yfd9Ul',
  '1xhMUu-m30TEAbs6SDcR42_JF5m0ryCII',
  '1BXulCho_fHLrx7p_Iuw29HGGM1pMEU2g',
  '185KgewWk0UIxONk33qAINJi7N_zpmxER',
];

export default async function EventPage({ params }: { params: { eventId: string } }) {
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
  
  let fetchedPhotoIds: string[] = [];
  let eventName = `Evento ${params.eventId || 'de Muestra'}`;
  let currentBannerId = defaultBannerImageId;

  if (FOLDER_ID) {
    try {
      fetchedPhotoIds = await getDriveFileIds(FOLDER_ID);
      if (fetchedPhotoIds.length > 0) {
        currentBannerId = fetchedPhotoIds[0]; // Use the newest photo as banner
        eventName = `Fotos Recientes: ${params.eventId || 'Evento Dinámico'}`;
      } else {
        eventName = `Carpeta Vacía: ${params.eventId || 'Evento Dinámico'}`;
        fetchedPhotoIds = fallbackPhotoIds; // Show fallback if folder is empty
        currentBannerId = fallbackPhotoIds[0] || defaultBannerImageId;
      }
    } catch (error) {
      console.error("Failed to fetch photos from Drive, using fallback:", error);
      fetchedPhotoIds = fallbackPhotoIds;
      currentBannerId = fallbackPhotoIds[0] || defaultBannerImageId;
      eventName = `Error al Cargar: ${params.eventId || 'Evento Dinámico'}`;
    }
  } else {
    console.warn("GOOGLE_DRIVE_FOLDER_ID is not set. Displaying fallback photos.");
    fetchedPhotoIds = fallbackPhotoIds;
    currentBannerId = fallbackPhotoIds[0] || defaultBannerImageId;
    eventName = `Evento de Muestra (Fallback): ${params.eventId}`;
  }

  const mockEvent = {
    id: params.eventId || 'sample-event',
    name: eventName,
    bannerUrl: `${googleDriveBaseUrl}${currentBannerId}`,
    colorScheme: { primary: '#A020F0', accent: '#008080' }, // Theme colors are global
  };

  const photos = fetchedPhotoIds.map((id, index) => ({
    id: `photo-${id}-${index}`, // Ensure unique key for React
    url: `${googleDriveBaseUrl}${id}`,
    photographer: `Foto de Drive ${index + 1}`, 
    timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(), // Mock timestamp
    favorites: Math.floor(Math.random() * 10), // Mock favorites
  }));


  if (!mockEvent) { // This check might be less relevant now
    return <div>Evento no encontrado.</div>;
  }

  return (
    <div className="space-y-8">
      <EventDetailsHeader name={mockEvent.name} bannerUrl={mockEvent.bannerUrl} photoCount={photos.length} />
      
      <div className="flex justify-center gap-4">
        <SlideshowModal photos={photos} trigger={
            <Button variant="outline" size="lg">
                <Film className="mr-2 h-5 w-5" />
                Iniciar Slideshow
            </Button>
        }/>
      </div>

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
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
}
