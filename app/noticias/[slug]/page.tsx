import React from "react";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";
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
  tipo_medio: "foto" | "video";
  video_url: string | null;
  fecha: string;
  autor: string;
  categoria: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper to extract YouTube video ID and build embed URL
function getYouTubeEmbedUrl(url: string | null) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Consultar directamente la base de datos (Server-side rendered)
  const sql = "SELECT * FROM noticias WHERE url_slug = ? AND estado = 'publicado' LIMIT 1";
  const noticias = await query<Noticia[]>(sql, [slug]);

  if (noticias.length === 0) {
    notFound();
  }

  const noticia = noticias[0];

  const embedUrl = getYouTubeEmbedUrl(noticia.video_url);

  return (
    <>
      <Header />
      <main className="flex-1 bg-brand-light pt-28 pb-20 text-[#1E1E1E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Volver */}
          <a
            href="/noticias"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-brand-red hover:text-brand-red/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a noticias
          </a>

          {/* Tarjeta del Artículo */}
          <article className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Imagen Principal o Video de YouTube */}
            {noticia.tipo_medio === "video" && embedUrl ? (
              <div className="relative aspect-video w-full bg-black border-b border-gray-200">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={embedUrl}
                  title={noticia.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              noticia.imagen_principal && (
                <div className="relative aspect-video w-full bg-gray-100 border-b border-gray-200">
                  <img
                    src={noticia.imagen_principal}
                    alt={noticia.titulo}
                    className="object-cover w-full h-full"
                  />
                </div>
              )
            )}

            <div className="p-8 space-y-6">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-brand-red" />
                  {new Date(noticia.fecha).toLocaleDateString("es-ES")}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4 text-brand-red" />
                  {noticia.categoria}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4 text-brand-red" />
                  {noticia.autor}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-2xl md:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                {noticia.titulo}
              </h1>

              {/* Resumen */}
              <p className="text-gray-600 font-medium border-l-4 border-brand-gold pl-4 text-sm md:text-base leading-relaxed py-1">
                {noticia.resumen}
              </p>

              {/* Contenido HTML */}
              <div 
                className={`prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed space-y-4 ${noticia.tipo_medio === 'video' ? '[&_.candidate-video]:hidden' : ''}`}
                dangerouslySetInnerHTML={{ __html: noticia.contenido }}
              />
            </div>
          </article>

        </div>
      </main>
      <Footer />
    </>
  );
}
