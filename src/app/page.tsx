import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, Users, QrCode } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-12">
      <section className="pt-12">
        <h1 className="text-5xl font-bold tracking-tight text-primary">
          Welcome to EventSnap!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Capture, share, and relive your special event moments in real-time. Easy for guests, delightful for hosts.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/events/sample-event">
              Explore a Sample Event <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">
              Guest Login
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl">
         <Image 
            src="https://picsum.photos/1200/400?random=1" 
            alt="Event hero image" 
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
              <Camera className="h-6 w-6" /> Easy Photo Sharing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Guests can easily upload photos directly from their phones during the event. All images are organized and accessible in a beautiful online gallery.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <QrCode className="h-6 w-6" /> Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Simple QR code scanning for guests to join the event space or for photobooth sessions to share specific photos instantly.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="h-6 w-6" /> Interactive Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Engage with a live updating photo feed, leave messages in a virtual event wall, and mark your favorite moments.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
