
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type SupportedLanguage = 'en' | 'es';
export type Translations = Record<string, string>;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: Dispatch<SetStateAction<SupportedLanguage>>;
  t: (key: string, replacements?: Record<string, string>) => string;
  translationsData: Record<SupportedLanguage, Translations>;
}

const translationsStore: Record<SupportedLanguage, Translations> = {
  en: {
    // General
    language: "Language",
    english: "English",
    spanish: "Español",

    // Header
    sampleEvent: "Sample Event",
    login: "Login",
    
    // Home Page
    welcomeToEventSnap: "Welcome to EventSnap!",
    homePageSubtitle: "Capture, share, and relive your special event moments in real-time. Easy for guests, delightful for hosts.",
    exploreSampleEvent: "Explore a Sample Event",
    guestLogin: "Guest Login",
    easyPhotoSharing: "Easy Photo Sharing",
    easyPhotoSharingDesc: "Guests can easily upload photos directly from their phones during the event. All images are organized and accessible in a beautiful online gallery.",
    quickAccess: "Quick Access",
    quickAccessDesc: "Simple QR code scanning for guests to join the event space or for photobooth sessions to share specific photos instantly.",
    interactiveExperience: "Interactive Experience",
    interactiveExperienceDesc: "Engage with a live updating photo feed, leave messages in a virtual event wall, and mark your favorite moments.",
    
    // Login Page
    loginPageTitle: "Guest Login",
    loginPageDescription: "Enter your phone number to access the event gallery.",
    
    // Phone Login Form
    phoneNumberLabel: "Phone Number",
    phoneNumberPlaceholder: "+1 123 456 7890",
    accessEventButton: "Access Event",
    phoneMinDigitsError: "Phone number must be at least 10 digits.",
    phoneInvalidFormatError: "Invalid phone number format.",
    loginSubmittedToastTitle: "Login Submitted",
    loginSubmittedToastDesc: "Attempting to log in with {phoneNumber}. (This is a mock action)",
  },
  es: {
    // General
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",

    // Header
    sampleEvent: "Evento de Muestra",
    login: "Iniciar Sesión",

    // Home Page
    welcomeToEventSnap: "¡Bienvenido a EventSnap!",
    homePageSubtitle: "Captura, comparte y revive los momentos especiales de tu evento en tiempo real. Fácil para los invitados, encantador para los anfitriones.",
    exploreSampleEvent: "Explorar Evento de Muestra",
    guestLogin: "Acceso de Invitados",
    easyPhotoSharing: "Compartir Fotos Fácilmente",
    easyPhotoSharingDesc: "Los invitados pueden subir fotos fácilmente desde sus teléfonos durante el evento. Todas las imágenes se organizan y son accesibles en una hermosa galería en línea.",
    quickAccess: "Acceso Rápido",
    quickAccessDesc: "Escaneo simple de código QR para que los invitados se unan al espacio del evento o para que las sesiones de fotomatón compartan fotos específicas al instante.",
    interactiveExperience: "Experiencia Interactiva",
    interactiveExperienceDesc: "Participa con un feed de fotos que se actualiza en vivo, deja mensajes en un muro virtual del evento y marca tus momentos favoritos.",

    // Login Page
    loginPageTitle: "Acceso de Invitados",
    loginPageDescription: "Ingresa tu número de teléfono para acceder a la galería del evento.",

    // Phone Login Form
    phoneNumberLabel: "Número de Teléfono",
    phoneNumberPlaceholder: "+1 123 456 7890",
    accessEventButton: "Acceder al Evento",
    phoneMinDigitsError: "El número de teléfono debe tener al menos 10 dígitos.",
    phoneInvalidFormatError: "Formato de número de teléfono inválido.",
    loginSubmittedToastTitle: "Inicio de Sesión Enviado",
    loginSubmittedToastDesc: "Intentando iniciar sesión con {phoneNumber}. (Esta es una acción simulada)",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en'); // Default language

  useEffect(() => {
    const storedLang = localStorage.getItem('appLanguage') as SupportedLanguage | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'es')) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, replacements?: Record<string, string>): string => {
    let translation = translationsStore[language][key] || translationsStore['en'][key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translationsData: translationsStore }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
