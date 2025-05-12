import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/icons/logo-icon';
import { UserCircle2 } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-background border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <LogoIcon className="h-8 w-8" />
          <span className="text-xl font-semibold">EventSnap</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/events/sample-event">Sample Event</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">
              <UserCircle2 className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
