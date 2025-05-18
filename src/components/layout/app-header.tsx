
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/icons/logo-icon';
import { UserCircle2, Languages } from 'lucide-react';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <LogoIcon className="h-8 w-8" />
          <span className="text-xl font-semibold">EventSnap</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/events/sample-event">{t('sampleEvent')}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">
              <UserCircle2 className="mr-2 h-4 w-4" /> {t('login')}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t('language')}>
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                disabled={language === 'en'}
              >
                {t('english')} {language === 'en' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('es')}
                disabled={language === 'es'}
              >
                {t('spanish')} {language === 'es' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
