import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Photo } from '@/components/event/photo-item'; // Reusing Photo type

type PhotoboothGalleryProps = {
  photos: Pick<Photo, 'id' | 'url'>[]; // Only need id and url for photobooth
};

export function PhotoboothGallery({ photos }: PhotoboothGalleryProps) {
  if (!photos || photos.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No photos in this session.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {photos.map((photo) => (
        <Card key={photo.id} className="overflow-hidden shadow-lg group">
          <CardContent className="p-0">
            <div className="aspect-[3/4] relative"> {/* Photobooth typically portrait */}
              <Image
                src={photo.url}
                alt={`Photobooth photo ${photo.id}`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="photobooth portrait fun"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
