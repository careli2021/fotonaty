"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Photo } from "./photo-item";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

type SlideshowModalProps = {
  photos: Photo[];
  startIndex?: number;
  trigger?: React.ReactNode;
};

export function SlideshowModal({ photos, startIndex = 0, trigger }: SlideshowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, photos.length]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl w-full p-0 bg-background text-foreground !rounded-lg overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Photo Slideshow</DialogTitle>
        </DialogHeader>
        {currentPhoto && (
          <div className="relative aspect-video w-full">
            <Image
              src={currentPhoto.url}
              alt={`Slideshow image ${currentIndex + 1}`}
              fill
              className="object-contain"
              data-ai-hint="event photo detail"
            />
          </div>
        )}
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <Button variant="ghost" size="icon" onClick={goToPrevious} className="text-white bg-black/30 hover:bg-black/50 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <Button variant="ghost" size="icon" onClick={goToNext} className="text-white bg-black/30 hover:bg-black/50 rounded-full">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
         <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-black/30 hover:bg-black/50 text-white p-1.5">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
        </DialogClose>
        <div className="p-4 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm">
            Photo {currentIndex + 1} of {photos.length}
            {currentPhoto?.photographer && ` by ${currentPhoto.photographer}`}
        </div>
      </DialogContent>
    </Dialog>
  );
}
