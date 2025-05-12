import { PhotoboothGallery } from '@/components/photobooth/photobooth-gallery';
import { Button } from '@/components/ui/button';
import { QrCode, Share2, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data
const mockPhotoboothGroup = {
  eventId: 'sample-event',
  groupId: 'group123',
  eventName: 'Lucy & John\'s Wedding 2025',
  photos: [
    { id: 'pb1', url: 'https://picsum.photos/seed/pb1/600/800' },
    { id: 'pb2', url: 'https://picsum.photos/seed/pb2/600/800' },
    { id: 'pb3', url: 'https://picsum.photos/seed/pb3/600/800' },
  ],
  qrCodeUrl: 'https://picsum.photos/seed/qrcode/200/200', // Placeholder QR
};

export default function PhotoboothGroupPage({ params }: { params: { eventId: string; groupId: string } }) {
  // In a real app, fetch group data based on params
  const groupData = mockPhotoboothGroup;

  if (!groupData) {
    return <div className="text-center py-10">Photobooth session not found.</div>;
  }

  const whatsappShareLink = `https://wa.me/?text=Check%20out%20our%20photobooth%20pics%20from%20${encodeURIComponent(groupData.eventName)}!%20${typeof window !== 'undefined' ? window.location.href : ''}`;


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Photobooth Session</h1>
        <p className="text-lg text-muted-foreground">
          From {groupData.eventName}
        </p>
        <p className="text-sm text-muted-foreground">Group ID: {params.groupId}</p>
      </header>
      
      <PhotoboothGallery photos={groupData.photos} />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t">
        <div className="flex flex-col items-center gap-2">
            <Image src={groupData.qrCodeUrl} alt="QR Code for these photos" width={120} height={120} className="rounded-md shadow-md" data-ai-hint="QR code" />
            <p className="text-xs text-muted-foreground">Scan to share</p>
        </div>
        <div className="flex flex-col gap-3">
             <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={whatsappShareLink} target="_blank" rel="noopener noreferrer">
                    <Share2 className="mr-2 h-5 w-5" /> Share on WhatsApp
                </Link>
            </Button>
            <Button size="lg" variant="outline">
                <Download className="mr-2 h-5 w-5" /> Download All (Mock)
            </Button>
             <Button variant="link" asChild>
                <Link href={`/events/${groupData.eventId}`}>Back to Main Event Gallery</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
