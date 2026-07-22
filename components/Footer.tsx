"use client";

import React from "react";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const whatsappMessage = encodeURIComponent(
    "Hola, deseo recibir información sobre las propuestas de Juan Carlos Llerena para Orcopampa."
  );
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : "#";

  return (
    <footer id="contacto" className="bg-[#121212] text-white border-t border-white/10 pt-16 pb-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid de Secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Presentación y Símbolo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 bg-white rounded-full overflow-hidden border border-brand-gold flex-shrink-0">
                <Image
                  src="/logo-arequipa-tradicion-y-futuro.png"
                  alt="Símbolo Tradición y Futuro"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-base tracking-wide leading-none">
                  JUAN CARLOS
                </span>
                <span className="text-brand-gold font-bold text-xs tracking-widest">
                  LLERENA ALCALDE
                </span>
              </div>
            </div>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
              Trabajando con honestidad, transparencia y gestión por resultados para lograr el desarrollo integral 
              del distrito de Orcopampa y sus comunidades.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-4">
            <h4 className="text-brand-gold font-bold text-sm uppercase tracking-wider">
              Enlaces de Interés
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/75">
              <li>
                <a href="#biografia" className="hover:text-brand-gold transition-colors">
                  Conoce a Juan Carlos
                </a>
              </li>
              <li>
                <a href="#experiencia" className="hover:text-brand-gold transition-colors">
                  Experiencia de Gestión
                </a>
              </li>
              <li>
                <a href="#propuestas" className="hover:text-brand-gold transition-colors">
                  Propuestas del Plan
                </a>
              </li>
              <li>
                <a href="/plan" className="hover:text-brand-gold transition-colors font-semibold">
                  Resumen de Plan de Gobierno
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="space-y-4">
            <h4 className="text-brand-gold font-bold text-sm uppercase tracking-wider">
              Contacto y Local
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/75">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-red flex-shrink-0" />
                <span>Local Central: Plaza de Armas s/n, Orcopampa</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-red flex-shrink-0" />
                <span>contacto@jcllerena.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#25D366] flex-shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">
                  WhatsApp: +{whatsappNumber}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="space-y-4">
            <h4 className="text-brand-gold font-bold text-sm uppercase tracking-wider">
              Sigue la Campaña
            </h4>
            <p className="text-white/60 text-xs">
              Conéctate a nuestras transmisiones en vivo, agenda de visitas y pronunciamientos oficiales.
            </p>
            <div className="flex items-center gap-3">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-white/10 transition-colors"
                  aria-label="Ir a Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-white/10 transition-colors"
                  aria-label="Ir a Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-white/10 font-bold text-xs"
                  aria-label="Ir a TikTok"
                >
                  T
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Separador e Info de Transparencia */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-white/50">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Juan Carlos Llerena Huamani. Todos los derechos reservados.</p>
            <p>Orcopampa, Arequipa - Campaña Distrital 2027-2030</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/privacidad" className="hover:text-brand-gold transition-colors">
              Política de Privacidad
            </a>
            <span>•</span>
            <a href="/terminos" className="hover:text-brand-gold transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
