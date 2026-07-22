"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface Noticia {
  id: number;
  titulo: string;
  url_slug: string;
  resumen: string;
  contenido: string;
  imagen_principal: string | null;
  fecha: string;
  autor: string;
  categoria: string;
}

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNoticias() {
      try {
        const res = await fetch("/api/noticias");
        const data = await res.json();
        if (data.success) {
          setNoticias(data.noticias);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadNoticias();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 bg-brand-light pt-28 pb-20 text-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Volver */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-brand-red hover:text-brand-red/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>

          {/* Encabezado */}
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest bg-white border border-brand-gold/20 px-3.5 py-1.5 rounded-full">
              Prensa y Novedades
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
              NOTICIAS Y COMUNICADOS
            </h1>
            <div className="w-20 h-1.5 bg-brand-red rounded-full"></div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500 font-semibold">
              Cargando noticias...
            </div>
          ) : noticias.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <p className="text-gray-500 font-semibold mb-2">No hay noticias publicadas por el momento.</p>
              <p className="text-xs text-gray-400">Vuelve más tarde para enterarte de los avances de campaña.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div className="space-y-4">
                    {/* Imagen principal (Placeholder si es null) */}
                    <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                      <img
                        src={item.imagen_principal || "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600"}
                        alt={item.titulo}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as any).src = "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600";
                        }}
                      />
                    </div>

                    {/* Metadata */}
                    <div className="px-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(item.fecha).toLocaleDateString("es-ES")}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5" />
                          {item.categoria}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                        <a href={`/noticias/${item.url_slug}`}>
                          {item.titulo}
                        </a>
                      </h2>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {item.resumen}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{item.autor}</span>
                    </div>
                    <a
                      href={`/noticias/${item.url_slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-red/80 transition-colors"
                    >
                      Leer Más →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
