"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, User, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from 'date-fns';


export type Photo = {
  id: string;
  url: string;
  photographer?: string;
  timestamp?: string;
  favorites?: number;
};

type PhotoItemProps = {
  photo: Photo;
};

export function PhotoItem({ photo }: PhotoItemProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(photo.favorites || 0);
  const [timeAgo, setTimeAgo] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (photo.timestamp) {
      setTimeAgo(formatDistanceToNow(new Date(photo.timestamp), { addSuffix: true }));
    }
  }, [photo.timestamp]);


  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    setFavoriteCount(prev => isFavorited ? prev -1 : prev + 1);
    toast({
        title: isFavorited ? "Unfavorited!" : "Favorited!",
        description: `You ${isFavorited ? "unfavorited" : "favorited"} a photo.`,
        variant: "default"
    })
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <CardContent className="p-0">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={photo.url}
            alt={`Event photo ${photo.id}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="event photo social"
          />
           <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/30 hover:bg-primary text-white hover:text-primary-foreground rounded-full h-9 w-9"
            onClick={handleFavorite}
            aria-label="Favorite photo"
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-destructive text-destructive' : 'text-white'}`} />
          </Button>
        </div>
        <div className="p-3 bg-card">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {photo.photographer && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{photo.photographer}</span>
              </div>
            )}
            {timeAgo && (
               <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{timeAgo}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {favoriteCount > 0 && (
              <span>{favoriteCount} {favoriteCount === 1 ? 'like' : 'likes'}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
