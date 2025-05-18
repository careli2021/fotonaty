
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, QrCode, Star, Share2, Briefcase, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function NewHomePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center space-y-16 md:space-y-24 pb-12 -mx-4 sm:-mx-0"> {/* Remove horizontal padding on smallest screens */}
      {/* Hero Section */}
      <section className="w-full h-[70vh] md:h-[80vh] relative flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt={t('heroAlt')}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
          data-ai-hint="event photography professional"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
        <div className="relative z-20 p-6 text-white max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-200">
            {t('heroSubtitle')}
          </p>
          <Button size="lg" asChild className="mt-8 bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 text-lg">
            <Link href="#services">
              {t('heroCTA')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services/Features Teaser Section */}
      <section id="services" className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">{t('servicesTitle')}</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('servicesDesc')}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{t('serviceCard1Title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>{t('serviceCard1Desc')}</CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center text-center">
               <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{t('serviceCard2Title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>{t('serviceCard2Desc')}</CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{t('serviceCard3Title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>{t('serviceCard3Desc')}</CardDescription>
            </CardContent>
          </Card>
        </div>
        <Button variant="outline" size="lg" asChild className="mt-12">
            <Link href="/features">
              {t('servicesCTA')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
        </Button>
      </section>

      {/* Portfolio/Gallery Teaser Section */}
      <section className="w-full bg-muted/30 py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">{t('galleryTitle')}</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('galleryDesc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-md group">
                 <Image src="https://placehold.co/600x600.png" alt={t('galleryImageAlt1')} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="event photography sample"/>
              </div>
               <div className="aspect-square relative rounded-lg overflow-hidden shadow-md group">
                 <Image src="https://placehold.co/600x600.png" alt={t('galleryImageAlt2')} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="party social gathering"/>
              </div>
               <div className="aspect-square relative rounded-lg overflow-hidden shadow-md group">
                 <Image src="https://placehold.co/600x600.png" alt={t('galleryImageAlt3')} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="wedding celebration moments"/>
              </div>
            </div>
            <Button size="lg" asChild className="mt-12 bg-primary hover:bg-primary/80 text-primary-foreground">
                <Link href="/events/sample-event">
                  {t('galleryCTA')} <ImageIcon className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </section>
      
      {/* Call to Action / Get Started Section */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">{t('contactTitle')}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          {t('contactDesc')}
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-3 text-lg">
            <Link href="/login"> {/* Or a future /contact page */}
              {t('contactCTA')} <Star className="ml-2 h-5 w-5" />
            </Link>
        </Button>
      </section>
    </div>
  );
}
