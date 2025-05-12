import { PhotoItem, type Photo } from './photo-item';

type PhotoGridProps = {
  photos: Photo[];
};

export function PhotoGrid({ photos }: PhotoGridProps) {
  if (!photos || photos.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No photos yet. Be the first to share!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <PhotoItem key={photo.id || `photo-${index}`} photo={photo} />
      ))}
    </div>
  );
}
