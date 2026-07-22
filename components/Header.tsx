"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";

const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Conoce a Juan Carlos", href: "#biografia" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Visión 2030", href: "#vision" },
  { label: "Propuestas", href: "#propuestas" },
  { label: "Noticias", href: "/noticias" },
  { label: "Agenda", href: "#agenda" },
  { label: "Galería", href: "#galeria" },
  { label: "Participa", href: "#participa" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-brand-dark/95 backdrop-blur-md shadow-md py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nombre */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#inicio" className="flex items-center gap-2 group">
              {/* Contenedor circular con borde dorado y fondo rojo */}
              <div className="h-10 w-10 rounded-full bg-brand-red border border-brand-gold flex items-center justify-center font-bold text-white shadow-md text-sm">
                JC
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-lg tracking-wide leading-none group-hover:text-brand-gold transition-colors">
                  JUAN CARLOS
                </span>
                <span className="text-brand-gold font-bold text-xs tracking-widest">
                  LLERENA
                </span>
              </div>
            </a>
          </div>

          {/* Menú de navegación de escritorio */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-brand-gold hover:bg-white/5 px-2.5 py-2 rounded-md text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Enlaces Sociales e Info */}
          <div className="hidden lg:flex items-center gap-3">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-brand-gold transition-colors"
                aria-label="Facebook Oficial"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-brand-gold transition-colors"
                aria-label="Instagram Oficial"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {tiktokUrl && (
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-brand-gold font-bold transition-colors text-sm"
                aria-label="TikTok Oficial"
              >
                T
              </a>
            )}
            <a
              href="#participa"
              className="bg-brand-red text-white hover:bg-brand-red/90 border border-brand-gold/50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow hover:scale-105"
            >
              Súmate
            </a>
          </div>

          {/* Botón de menú móvil */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-brand-gold focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-4 bg-brand-dark/95 backdrop-blur-lg border-b border-brand-gold/20" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-white hover:text-brand-gold hover:bg-white/5 px-3 py-3 rounded-md text-base font-semibold transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 flex items-center justify-center gap-6 border-t border-white/10 mt-4">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-gold"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
            <a
              href="#participa"
              onClick={() => setIsOpen(false)}
              className="bg-brand-red text-white hover:bg-brand-red/90 border border-brand-gold px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider shadow"
            >
              Súmate al Equipo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
