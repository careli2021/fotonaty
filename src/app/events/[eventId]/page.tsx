import { EventDetailsHeader } from '@/components/event/event-details-header';
import { PhotoGrid } from '@/components/event/photo-grid';
import { EventChat } from '@/components/event/event-chat';
import { Button } from '@/components/ui/button';
import { Film, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data for the event and photos
const mockEvent = {
  id: 'sample-event',
  name: 'Lucy & John\'s Wedding 2025',
  bannerUrl: 'https://picsum.photos/seed/eventbanner/1200/300',
  colorScheme: { primary: '#A020F0', accent: '#008080' }, // Example, not yet implemented dynamically
};

const mockPhotos = Array.from({ length: 15 }, (_, i) => ({
  id: `photo${i + 1}`,
  url: `https://picsum.photos/400/300?random=${i + 1}`,
  photographer: `Guest ${String.fromCharCode(65 + (i % 5))}`, // Guest A, B, C, D, E
  timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  favorites: Math.floor(Math.random() * 50),
}));


export default function EventPage({ params }: { params: { eventId: string } }) {
  // In a real app, fetch event data based on params.eventId
  const event = mockEvent; // Using mock data
  const photos = mockPhotos; // Using mock data

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="space-y-8">
      <EventDetailsHeader name={event.name} bannerUrl={event.bannerUrl} photoCount={photos.length} />
      
      <div className="flex justify-center gap-4">
        {/* Slideshow button - functionality to be implemented in SlideshowModal */}
        <Button variant="outline" size="lg">
          <Film className="mr-2 h-5 w-5" />
          Start Slideshow
        </Button>
      </div>

      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primary flex items-center">
            <MessageSquare className="mr-3 h-7 w-7" />
            Event Wall & Chat
        </h2>
        <EventChat />
      </div>
      
      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primary">Event Gallery</h2>
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
}
