"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, MapPin, Video, Map, Play } from "lucide-react";

interface Evento {
  id: number;
  titulo: string;
  fecha_hora: string;
  lugar: string;
  comunidad_sector: string;
  descripcion: string | null;
  imagen_url: string | null;
  ubicacion_url: string | null;
  transmision_url: string | null;
  estado: "programado" | "concluido" | "cancelado";
}

export default function AgendaPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgenda() {
      try {
        const res = await fetch("/api/agenda");
        const data = await res.json();
        if (data.success) {
          setEventos(data.agenda);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAgenda();
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
              Actividades y Encuentros
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
              AGENDA DEL CANDIDATO
            </h1>
            <div className="w-20 h-1.5 bg-brand-red rounded-full"></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
              Sigue de cerca las visitas sectoriales, mesas de diálogo y transmisiones de nuestro candidato 
              en Orcopampa y sus comunidades.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500 font-semibold">
              Cargando agenda electoral...
            </div>
          ) : eventos.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <p className="text-gray-500 font-semibold mb-2">No hay actividades programadas en este momento.</p>
              <p className="text-xs text-gray-400">Pronto se anunciarán las visitas y asambleas comunales.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventos.map((evt) => {
                const dateObj = new Date(evt.fecha_hora);
                const isVideoLink = evt.transmision_url && (evt.transmision_url.includes("youtube.com") || evt.transmision_url.includes("youtu.be") || evt.transmision_url.includes("drive.google.com"));
                
                return (
                  <article
                    key={evt.id}
                    className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div className="space-y-4">
                      {/* Imagen Promocional o Video Overlay */}
                      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden border-b border-gray-250">
                        {evt.imagen_url ? (
                          <img
                            src={evt.imagen_url}
                            alt={evt.titulo}
                            className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as any).src = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1E1E1E] flex flex-col items-center justify-center text-center p-4">
                            <span className="font-extrabold text-brand-gold text-lg tracking-wider block">ORCOPAMPA 2027</span>
                            <span className="text-white/60 text-xs mt-1 uppercase tracking-widest font-semibold">{evt.comunidad_sector}</span>
                          </div>
                        )}

                        {/* Badges en la Imagen */}
                        <div className="absolute top-3 left-3 z-20 flex gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                            evt.estado === "programado"
                              ? "bg-[#25D366]/90 text-white border-[#25D366]/30"
                              : evt.estado === "concluido"
                              ? "bg-zinc-800/90 text-zinc-350 border-zinc-700/30"
                              : "bg-brand-red/90 text-white border-brand-red/30"
                          }`}>
                            {evt.estado === "programado" ? "Programado" : evt.estado === "concluido" ? "Concluido" : "Cancelado"}
                          </span>
                        </div>
                      </div>

                      {/* Detalles */}
                      <div className="px-6 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-brand-red" />
                            {dateObj.toLocaleDateString("es-ES")}
                          </span>
                          <span className="flex items-center gap-1 justify-end">
                            <Clock className="h-4 w-4 text-brand-red" />
                            {dateObj.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h2 className="text-lg font-black text-brand-dark group-hover:text-brand-red transition-colors leading-snug">
                          {evt.titulo}
                        </h2>

                        <div className="flex items-start gap-1.5 text-xs text-gray-700 font-medium">
                          <MapPin className="h-4 w-4 text-brand-red flex-shrink-0 mt-0.5" />
                          <span>{evt.lugar} ({evt.comunidad_sector})</span>
                        </div>

                        {evt.descripcion && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 pt-2">
                            {evt.descripcion}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Botones de acción (Transmisión / Ubicación) */}
                    <div className="px-6 pb-6 pt-4 mt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center text-xs">
                      {evt.transmision_url ? (
                        <a
                          href={evt.transmision_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-brand-red hover:text-brand-red/80 transition-colors uppercase tracking-wider"
                        >
                          <Video className="h-4 w-4" />
                          Ver Transmisión
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Sin transmisión</span>
                      )}

                      {evt.ubicacion_url && (
                        <a
                          href={evt.ubicacion_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-brand-light border border-gray-200 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-bold transition-all uppercase tracking-wide"
                        >
                          <Map className="h-3.5 w-3.5" />
                          Ubicación
                        </a>
                      )}
                    </div>

                  </article>
                );
              })}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
