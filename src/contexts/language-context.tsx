
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

    // Header & Navigation
    home: "Home",
    portfolio: "Portfolio",
    aboutMe: "About Me",
    contactMe: "Contact Me",
    partyEvent: "Party Event",
    sampleEvent: "Sample Event",
    login: "Login",
    
    // Old Home Page (now /features)
    welcomeToEventSnap: "Fotografia Personalizada Sesiones Marketing", 
    homePageSubtitle: "Captura momentos únicos y crea recuerdos inolvidables en tus eventos sociales, sesiones personales y fotografía de productos con nuestra ayuda.",
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

    // New Home Page (src/app/page.tsx)
    heroTitle: "Your Event, Beautifully Captured",
    heroSubtitle: "Professional event photography and real-time sharing. Create lasting memories with Nathaly Ponte Fotografa.",
    heroCTA: "Explore Our Work",
    heroAlt: "Hero image showcasing a vibrant event",
    servicesTitle: "Our Services",
    servicesDesc: "Discover how Nathaly Ponte Fotografa can elevate your next event with seamless photo sharing and interactive experiences.",
    serviceCard1Title: "Stunning Event Photography",
    serviceCard1Desc: "Capturing every detail and emotion with professional quality and artistic vision.",
    serviceCard2Title: "Real-Time Photo Sharing",
    serviceCard2Desc: "Guests instantly view and share photos, creating a dynamic event experience.",
    serviceCard3Title: "Interactive Photobooth Fun",
    serviceCard3Desc: "Add excitement with customizable photobooths, perfect for any occasion.",
    servicesCTA: "Discover All Features",
    galleryTitle: "Event Galleries",
    galleryDesc: "Relive the moments. Browse through our featured event galleries.",
    galleryImageAlt1: "Sample event photo 1",
    galleryImageAlt2: "Sample event photo 2",
    galleryImageAlt3: "Sample event photo 3",
    galleryCTA: "View Sample Gallery",
    contactTitle: "Let's Create Something Amazing",
    contactDesc: "Ready to capture your next event? Get in touch with us today!",
    contactCTA: "Get Started",

    // Features Page (src/app/features/page.tsx)
    featuresPageTitle: "Nathaly Ponte Fotografa Features",
    featuresPageSubtitle: "Explore how Nathaly Ponte Fotografa makes photo sharing at your events simple and engaging.",
    featurePageMainImageAlt: "Banner showcasing Nathaly Ponte Fotografa features",

  },
  es: {
    // General
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",

    // Header & Navigation
    home: "Inicio",
    portfolio: "Portafolio",
    aboutMe: "Sobre Mí",
    contactMe: "Contáctame",
    partyEvent: "Evento Fiesta",
    sampleEvent: "Evento de Muestra",
    login: "Iniciar Sesión",

    // Old Home Page (now /features)
    welcomeToEventSnap: "Nathaly Studio ! Fotografia Personalizada",
    homePageSubtitle: "Captura momentos únicos y crea recuerdos inolvidables en tus eventos sociales, sesiones personales y fotografía de productos con nuestra ayuda.",
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

    // New Home Page (src/app/page.tsx)
    heroTitle: "Tu Evento, Capturado Hermosamente",
    heroSubtitle: "Fotografía profesional de eventos y uso compartido en tiempo real. Crea recuerdos duraderos con Nathaly Ponte Fotografa.",
    heroCTA: "Explora Nuestro Trabajo",
    heroAlt: "Imagen principal mostrando un evento vibrante",
    servicesTitle: "Nuestros Servicios",
    servicesDesc: "Descubre cómo Nathaly Ponte Fotografa puede realzar tu próximo evento con un intercambio de fotos fluido y experiencias interactivas.",
    serviceCard1Title: "Fotografía de Eventos Impresionante",
    serviceCard1Desc: "Capturando cada detalle y emoción con calidad profesional y visión artística.",
    serviceCard2Title: "Uso Compartido de Fotos en Tiempo Real",
    serviceCard2Desc: "Los invitados ven y comparten fotos al instante, creando una experiencia de evento dinámica.",
    serviceCard3Title: "Fotomatón Interactivo y Divertido",
    serviceCard3Desc: "Añade emoción con nuestros fotomatones personalizables, perfectos para cualquier ocasión.",
    servicesCTA: "Descubre Todas las Funciones",
    galleryTitle: "Galerías de Eventos",
    galleryDesc: "Revive los momentos. Navega por nuestras galerías de eventos destacadas.",
    galleryImageAlt1: "Foto de evento de muestra 1",
    galleryImageAlt2: "Foto de evento de muestra 2",
    galleryImageAlt3: "Foto de evento de muestra 3",
    galleryCTA: "Ver Galería de Muestra",
    contactTitle: "Creemos Algo Increíble",
    contactDesc: "¿Lista para capturar tu próximo evento? ¡Contáctanos hoy mismo!",
    contactCTA: "Comenzar",

    // Features Page (src/app/features/page.tsx)
    featuresPageTitle: "Características de Nathaly Ponte Fotografa",
    featuresPageSubtitle: "Explora cómo Nathaly Ponte Fotografa hace que compartir fotos en tus eventos sea simple y atractivo.",
    featurePageMainImageAlt: "Banner mostrando las características de Nathaly Ponte Fotografa",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('es'); // Default language

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
