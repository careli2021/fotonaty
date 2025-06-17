
import { EventDetailsHeader } from '@/components/event/event-details-header';
import { PhotoGrid } from '@/components/event/photo-grid';
import { EventChat } from '@/components/event/event-chat';
import { Button } from '@/components/ui/button';
import { Film, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SlideshowModal } from '@/components/event/slideshow-modal';

// IDs de Google Drive proporcionados por el usuario
const bannerImageId = '1d0bMVmSk2pMe6S3ZgG0bKeSPS_Yfd9Ul'; // Primera imagen para el banner

// Fotos para la galería
const photoIds = [
  '1d0bMVmSk2pMe6S3ZgG0bKeSPS_Yfd9Ul',
  '1xhMUu-m30TEAbs6SDcR42_JF5m0ryCII',
  '1BXulCho_fHLrx7p_Iuw29HGGM1pMEU2g',
  '185KgewWk0UIxONk33qAINJi7N_zpmxER',
  // Puedes añadir más IDs aquí si tienes más fotos
];

const googleDriveBaseUrl = 'https://drive.google.com/uc?export=download&id=';

const mockEvent = {
  id: 'sample-event',
  name: 'Fiesta de Ejemplo con Fotos de Drive',
  bannerUrl: `${googleDriveBaseUrl}${bannerImageId}`,
  colorScheme: { primary: '#A020F0', accent: '#008080' }, // Los colores del tema se manejan globalmente
};

const mockPhotos = photoIds.map((id, index) => ({
  id: `photo${index + 1}`,
  url: `${googleDriveBaseUrl}${id}`,
  photographer: `Invitado ${String.fromCharCode(65 + (index % 5))}`,
  timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  favorites: Math.floor(Math.random() * 50),
}));


export default function EventPage({ params }: { params: { eventId: string } }) {
  const event = mockEvent; 
  const photos = mockPhotos;

  if (!event) {
    return <div>Evento no encontrado.</div>;
  }

  return (
    <div className="space-y-8">
      <EventDetailsHeader name={event.name} bannerUrl={event.bannerUrl} photoCount={photos.length} />
      
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
