import Image from 'next/image';
import { Camera } from 'lucide-react';

type EventDetailsHeaderProps = {
  name: string;
  bannerUrl: string;
  photoCount: number;
};

export function EventDetailsHeader({ name, bannerUrl, photoCount }: EventDetailsHeaderProps) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <Image
        src={bannerUrl}
        alt={`${name} banner`}
        width={1200}
        height={300}
        className="w-full h-48 md:h-72 object-cover"
        priority
        data-ai-hint="event banner celebration"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">{name}</h1>
        <div className="mt-2 flex items-center text-lg opacity-90 drop-shadow-sm">
            <Camera className="mr-2 h-5 w-5" />
            <span>{photoCount} photos shared</span>
        </div>
      </div>
    </div>
  );
}
