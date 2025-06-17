import { EventDetailsHeader } from '@/components/event/event-details-header';
import { PhotoGrid } from '@/components/event/photo-grid';
import { EventChat } from '@/components/event/event-chat';
import { Button } from '@/components/ui/button';
import { Film, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// IDs de ejemplo de Google Drive (reemplazar con IDs reales de la carpeta)
// Banner
const bannerImageId = '1B2wX8uLgR_5nYtPqE7oT-sVcA3ZkFhJ0'; // Reemplaza con un ID de imagen real para el banner

// Fotos para la galería (reemplaza con IDs reales de tu carpeta)
const photoIds = [
  '1c3xY9vMhS_6oZuQrF8pU_tWdB4AlGiK1',
  '1d4zZ0wNiT_7pAvRsG9qV_uXeC5BmHjL2',
  '1e5aA1xOjU_8qBwStH0rW_vYfD6CnIkM3',
  '1f6bB2yPkV_9rCxTuI1sX_wZgE7DoJlM4',
  '1g7cC3zQlW_0sDyUvJ2tY_xAhF8EpKmN5',
  '1h8dD4aRmX_1tEzWwK3uZ_yBiG9FqLnO6',
  '1i9eE5bSnY_2uFaXxL4vA_zCjH0GrMoP7',
  '1j0fF6cToZ_3vGbYyM5wB_aDkI1HsNpQ8',
  '1k1gG7dUpa_4wHcZzN6xCA_bElJ2ItOr9',
  '1l2hH8eVqb_5xIdAaO7yDB_cFmK3JuPs0',
  '1m3iI9fWrc_6yJeBbP8zDC_dGnL4KvQt1',
  '1n4jJ0gXsd_7zKfCcQ9aED_eHoM5LwRu2',
  '1o5kK1hYte_8aLgDdR0bFE_fIpN6MxSv3',
  '1p6lL2iZuf_9bMhEeS1cGF_gJqO7NyTw4',
  '1q7mM3jAvf_0cNiFfT2dHG_hKrP8OzUx5',
];

const googleDriveBaseUrl = 'https://drive.google.com/uc?export=download&id=';

const mockEvent = {
  id: 'sample-event',
  name: 'Fiesta de Ejemplo con Fotos de Drive', // Nombre actualizado
  bannerUrl: `${googleDriveBaseUrl}${bannerImageId}`,
  colorScheme: { primary: '#A020F0', accent: '#008080' },
};

const mockPhotos = photoIds.map((id, index) => ({
  id: `photo${index + 1}`,
  url: `${googleDriveBaseUrl}${id}`,
  photographer: `Invitado ${String.fromCharCode(65 + (index % 5))}`,
  timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  favorites: Math.floor(Math.random() * 50),
}));


export default function EventPage({ params }: { params: { eventId: string } }) {
  // En una aplicación real, obtendrías los datos del evento según params.eventId
  // y los IDs de las fotos de una base de datos o API.
  const event = mockEvent; 
  const photos = mockPhotos;

  if (!event) {
    return <div>Evento no encontrado.</div>;
  }

  return (
    <div className="space-y-8">
      <EventDetailsHeader name={event.name} bannerUrl={event.bannerUrl} photoCount={photos.length} />
      
      <div className="flex justify-center gap-4">
        {/* El botón de Slideshow necesitaría que SlideshowModal también use las fotos de Drive */}
        <Button variant="outline" size="lg">
          <Film className="mr-2 h-5 w-5" />
          Iniciar Slideshow
        </Button>
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
