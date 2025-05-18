
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, Users, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

export default function FeaturesPage() { // Renamed from HomePage to FeaturesPage
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center space-y-12 py-8">
      <section className="pt-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          {t('featuresPageTitle')} {/* Create new key for this title */}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('featuresPageSubtitle')} {/* Create new key for this subtitle */}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/events/sample-event">
              {t('exploreSampleEvent')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">
              {t('guestLogin')}
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl">
         <Image 
            src="https://placehold.co/1200x400.png" 
            alt={t('featurePageMainImageAlt')}  // New key
            width={1200} 
            height={400} 
            className="rounded-lg shadow-xl aspect-[3/1] object-cover"
            data-ai-hint="event celebration party"
          />
      </section>

      <section className="grid md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Camera className="h-6 w-6" /> {t('easyPhotoSharing')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {t('easyPhotoSharingDesc')}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <QrCode className="h-6 w-6" /> {t('quickAccess')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {t('quickAccessDesc')}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="h-6 w-6" /> {t('interactiveExperience')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {t('interactiveExperienceDesc')}
            </CardDescription>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
