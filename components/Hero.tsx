"use client";

import React from "react";
import Image from "next/image";
import { FileText, Users, ArrowDown, ChevronRight, MessageSquare } from "lucide-react";

export default function Hero() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL;

  const whatsappMessage = encodeURIComponent(
    "Hola, deseo recibir información sobre las propuestas de Juan Carlos Llerena para Orcopampa."
  );
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : "#";

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark/95 to-[#121212] text-white"
    >
      {/* Elementos decorativos de fondo (Glows y patrones) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/15 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Información y Propuesta de Valor */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8">
            
            {/* Tag Partido Político */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-2 pr-4 w-fit shadow-inner hover:bg-white/10 transition-colors">
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
                <span className="text-brand-gold uppercase tracking-wider leading-none">Movimiento Regional</span>
                <span className="text-white/85 leading-tight">Arequipa Tradición y Futuro</span>
              </div>
            </div>

            {/* Título Principal */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
                <span className="block text-white">JUAN CARLOS</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-red to-brand-gold">
                  LLERENA HUAMANI
                </span>
              </h1>
              <p className="text-brand-gold text-lg md:text-xl font-bold uppercase tracking-widest border-l-4 border-brand-red pl-4">
                Candidato a la Alcaldía Distrital de Orcopampa
              </p>
            </div>

            {/* Mensaje Territorial */}
            <div className="space-y-1">
              <p className="text-white/80 text-sm md:text-base font-semibold tracking-wide uppercase">
                Plan de Gobierno 2027 - 2030:
              </p>
              <blockquote className="text-brand-gold/90 font-medium italic text-base md:text-lg border-l-2 border-brand-gold/30 pl-4 py-1 leading-relaxed">
                “No vine a prometer, vine a demostrar, las obras hablan por mi”
              </blockquote>
            </div>

            {/* Lema Principal y descripción */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white">
                “{process.env.NEXT_PUBLIC_LEMA || "GESTIÓN Y DESARROLLO"}”
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Un plan de gobierno técnico, inclusivo y transparente diseñado para responder con obras reales, 
                seguridad jurídica y crecimiento económico a cada una de nuestras comunidades y anexos.
              </p>
            </div>

            {/* Acciones Rápidas (Botones) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#propuestas"
                className="inline-flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red/90 border border-brand-gold/40 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-[1.03] group"
              >
                Conoce nuestras propuestas
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/documents/Plan de Gobierno 2027-2030 General.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow hover:scale-[1.03]"
              >
                <FileText className="h-4 w-4 text-brand-gold" />
                Descargar Plan de Gobierno
              </a>
            </div>

            {/* Voluntariado y WhatsApp */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs md:text-sm text-white/80">
              <a 
                href="#participa" 
                className="inline-flex items-center gap-1.5 hover:text-brand-gold transition-colors font-semibold"
              >
                <Users className="h-4 w-4 text-brand-gold" />
                Súmate al equipo
              </a>
              <span className="text-white/30 hidden sm:inline">|</span>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-gold transition-colors font-semibold"
              >
                <MessageSquare className="h-4 w-4 text-[#25D366]" />
                Contáctanos por WhatsApp
              </a>
            </div>
          </div>

          {/* Columna Derecha: Composición de Portada / Imagen */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Tarjeta de Composición Visual Inspirada */}
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-gold/40 bg-gradient-to-b from-[#222222] to-brand-dark">
              
              {/* Overlay de Degradado Superior e Inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 z-10"></div>
              
              {/* Imagen del Candidato Placeholder */}
              <div className="absolute inset-0 w-full h-full">
                {/* Cargamos la primera foto del candidato de la carpeta FOTOS si existe o una imagen genérica premium */}
                <Image
                  src="/FOTOS/foto1.jpeg"
                  alt="Juan Carlos Llerena"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback a una imagen de placeholder si no carga foto1
                    (e.target as any).src = "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Información Superpuesta en la Imagen (Composición) */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                <div className="bg-brand-red/90 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-gold/30">
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
                <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">
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
          <span className="text-[10px] uppercase tracking-widest font-semibold text-white/60">
            Conoce más
          </span>
          <a href="#biografia" className="animate-bounce" aria-label="Desplazarse hacia abajo">
            <ArrowDown className="h-4 w-4 text-brand-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}
