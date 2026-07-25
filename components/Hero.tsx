"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FileText, Users, ArrowDown, ChevronRight, MessageSquare } from "lucide-react";

const BACKGROUND_IMAGES = [
  "/media__1784907150719.png", // Municipalidad y Plaza
  "/media__1784907158570.png", // Paisaje natural con lechuza y montañas nevadas
  "/media__1784907162679.jpg", // Laguna de Orcopampa
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 6000); // Cambia de imagen cada 6 segundos
    return () => clearInterval(timer);
  }, []);

  const whatsappNumber = "51927586733";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61592073647387";
  const instagramUrl = "https://www.instagram.com/juancarlosllerenah/";
  const tiktokUrl = "https://www.tiktok.com/@juancarlosllerenahuamani";

  const whatsappMessage = encodeURIComponent(
    "Hola, deseo recibir información sobre las propuestas de Juan Carlos Llerena para Orcopampa."
  );
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : "#";

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-light text-brand-dark"
    >
      {/* Carrusel de fondo dinámico con desvanecimiento suave */}
      <div className="absolute inset-0 z-0">
        {BACKGROUND_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } transform transition-transform duration-[6000ms]`}
          >
            <Image
              src={src}
              alt={`Paisaje de Orcopampa ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* Sin overlays oscuros para mostrar los colores intensos originales del carrusel */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Información y Propuesta de Valor con tarjeta frosted glass clara para legibilidad */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8 bg-white/85 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/50 shadow-2xl z-10">
            
            {/* Tag Partido Político */}
            <div className="inline-flex items-center gap-3 bg-brand-dark/5 border border-brand-dark/10 rounded-full p-2 pr-4 w-fit shadow-inner hover:bg-brand-dark/10 transition-colors">
              <div className="relative h-10 w-10 bg-white rounded-full overflow-hidden border border-brand-gold/40 flex-shrink-0">
                <Image
                  src="/logo-arequipa-tradicion-y-futuro.png"
                  alt="Símbolo Tradición y Futuro"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-xs font-semibold">
                <span className="text-[#9B7A00] uppercase tracking-wider leading-none">Movimiento Regional</span>
                <span className="text-brand-dark/85 leading-tight">Arequipa Tradición y Futuro</span>
              </div>
            </div>

            {/* Título Principal */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
                <span className="block text-brand-dark">JUAN CARLOS</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#991B1B] via-brand-red to-[#B8860B]">
                  LLERENA HUAMANI
                </span>
              </h1>
              <p className="text-brand-red text-lg md:text-xl font-bold uppercase tracking-widest border-l-4 border-brand-red pl-4">
                Candidato a la Alcaldía Distrital de Orcopampa
              </p>
            </div>

            {/* Mensaje Territorial */}
            <div className="space-y-1">
              <p className="text-brand-dark/80 text-sm md:text-base font-semibold tracking-wide uppercase">
                Plan de Gobierno 2027 - 2030:
              </p>
              <blockquote className="text-brand-dark/95 font-medium italic text-base md:text-lg border-l-2 border-[#9B7A00]/55 pl-4 py-1 leading-relaxed">
                “No vine a prometer, vine a demostrar, las obras hablan por mi”
              </blockquote>
            </div>

            {/* Lema Principal y descripción */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-brand-dark">
                “{process.env.NEXT_PUBLIC_LEMA || "OBRAS QUE QUEDAN, CORAZÓN QUE NO SE OLVIDA"}”
              </h2>
              <p className="text-brand-dark/75 text-sm md:text-base leading-relaxed font-medium">
                Un plan de gobierno técnico, inclusivo y transparente diseñado para responder con obras reales, 
                seguridad jurídica y crecimiento económico a cada una de nuestras comunidades y anexos.
              </p>
            </div>

            {/* Acciones Rápidas (Botones) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#propuestas"
                className="inline-flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red/90 border border-[#9B7A00]/40 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-[1.03] group"
              >
                Conoce nuestras propuestas
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/documents/Plan de Gobierno 2027-2030 General.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-brand-dark/5 hover:bg-brand-dark/10 border border-brand-dark/20 text-brand-dark px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow hover:scale-[1.03]"
              >
                <FileText className="h-4 w-4 text-brand-red" />
                Descargar Plan de Gobierno
              </a>
            </div>

            {/* Voluntariado y WhatsApp */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs md:text-sm text-brand-dark/80">
              <a 
                href="#participa" 
                className="inline-flex items-center gap-1.5 hover:text-brand-red transition-colors font-bold"
              >
                <Users className="h-4 w-4 text-brand-red" />
                Súmate al equipo
              </a>
              <span className="text-brand-dark/30 hidden sm:inline">|</span>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-red transition-colors font-bold"
              >
                <MessageSquare className="h-4 w-4 text-[#1E7E34]" />
                Contáctanos por WhatsApp
              </a>
            </div>
          </div>

          {/* Columna Derecha: Composición de Portada / Imagen */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Tarjeta de Composición Visual Inspirada */}
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#9B7A00]/40 bg-gradient-to-b from-[#222222] to-brand-dark">
              
              {/* Overlay de Degradado Superior e Inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 z-10"></div>
              
              {/* Imagen del Candidato Placeholder */}
              <div className="absolute inset-0 w-full h-full">
                {/* Cargamos la primera foto del candidato de la carpeta FOTOS si existe o una imagen genérica premium */}
                <Image
                  src="/listo1.png"
                  alt="Juan Carlos Llerena"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback a una imagen de placeholder si no carga listo1
                    (e.target as any).src = "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Información Superpuesta en la Imagen (Composición) */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                <div className="bg-brand-red/90 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#9B7A00]/30">
                  Orcopampa 2027
                </div>
                <div className="h-12 w-12 bg-white rounded-xl shadow-lg border border-brand-gold/50 flex items-center justify-center p-1.5 relative overflow-hidden">
                  <Image
                    src="/logo-arequipa-tradicion-y-futuro.png"
                    alt="Logo Tradición y Futuro"
                    width={40}
                    height={40}
                    className="object-contain opacity-90"
                  />
                  {/* Marca de Voto 'X' dibujada sobre el símbolo */}
                  <div className="absolute inset-0 flex items-center justify-center p-1 z-30 pointer-events-none select-none">
                    <svg className="w-full h-full text-brand-red filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
                      <line x1="3" y1="3" x2="21" y2="21" />
                      <line x1="21" y1="3" x2="3" y2="21" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Información de Campaña Inferior */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-20 text-center space-y-2">
                <p className="text-[#9B7A00] font-bold text-xs uppercase tracking-widest">
                  ALCALDE DISTRITAL
                </p>
                <h3 className="text-2xl font-black tracking-wide leading-none text-white">
                  JUAN CARLOS LLERENA
                </h3>
                <div className="w-12 h-1 bg-brand-red mx-auto my-1 rounded"></div>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">
                  Arequipa Tradición y Futuro
                </p>
              </div>
            </div>

            {/* Círculo de Símbolo Flotante de Fondo */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-red rounded-full border-2 border-brand-gold flex items-center justify-center shadow-xl z-20 hover:scale-110 transition-transform duration-300">
              <span className="font-extrabold text-white text-3xl select-none">L</span>
            </div>
          </div>
        </div>

        {/* Indicador de Desplazamiento */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity z-20">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/80">
            Conoce más
          </span>
          <a href="#biografia" className="animate-bounce" aria-label="Desplazarse hacia abajo">
            <ArrowDown className="h-4 w-4 text-brand-red" />
          </a>
        </div>
      </div>
    </section>
  );
}
