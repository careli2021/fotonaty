"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/icons/logo-icon';
import { UserCircle2, Languages, Home, Image, User, Mail, PartyPopper, Star } from 'lucide-react';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function AppHeader() {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setMobileMenuOpen(false); // Close mobile menu on language change
  };

  const navLinks = [
    { href: "/", label: t('home'), icon: <Home className="mr-2 h-4 w-4" /> },
    { href: "/portfolio", label: t('portfolio'), icon: <Image className="mr-2 h-4 w-4" /> },
    { href: "/about", label: t('aboutMe'), icon: <User className="mr-2 h-4 w-4" /> },
    { href: "/contact", label: t('contactMe'), icon: <Mail className="mr-2 h-4 w-4" /> },
    { href: "/events/sample-event", label: t('partyEvent'), icon: <PartyPopper className="mr-2 h-4 w-4" /> },
    { href: "/events/sample-event", label: t('sampleEvent'), icon: <Star className="mr-2 h-4 w-4" /> },
  ];

  const renderNavLinks = (isMobileLayout = false) => (
    navLinks.map(link => (
      <Button variant="ghost" asChild key={link.href + link.label} onClick={() => isMobileLayout && setMobileMenuOpen(false)}>
        <Link href={link.href} className={isMobileLayout ? "flex items-center justify-start w-full p-4 text-lg" : ""}>
          {isMobileLayout && link.icon}
          {link.label}
        </Link>
      </Button>
    ))
  );

  return (
    <header className="bg-background border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <LogoIcon className="h-8 w-8" />
          <span className="text-xl font-semibold">Nathaly Ponte Fotografa</span>
        </Link>

        {isMobile ? (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <nav className="flex flex-col space-y-3 pt-8">
                {renderNavLinks(true)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-start w-full p-4 text-lg">
                      <Languages className="mr-2 h-4 w-4" /> {t('language')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[220px]">
                    <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>
                      {t('english')} {language === 'en' && '✓'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange('es')} disabled={language === 'es'}>
                      {t('spanish')} {language === 'es' && '✓'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" asChild onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-start w-full p-4 text-lg">
                  <Link href="/login">
                    <UserCircle2 className="mr-2 h-4 w-4" /> {t('login')}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex items-center gap-1">
            {renderNavLinks()}
            <Button variant="outline" asChild>
              <Link href="/login">
                <UserCircle2 className="mr-2 h-4 w-4 sm:mr-0 md:mr-2" />
                <span className="hidden sm:inline md:inline">{t('login')}</span>
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
                <DropdownMenuItem onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>
                  {t('english')} {language === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('es')} disabled={language === 'es'}>
                  {t('spanish')} {language === 'es' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}
      </div>
    </header>
  );
}