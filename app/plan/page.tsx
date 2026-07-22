"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Download, Share2, ArrowLeft } from "lucide-react";

export default function GovernmentPlanPage() {
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      "Hola, te comparto el Plan de Gobierno 2027-2030 de Juan Carlos Llerena para Orcopampa: https://jcllerena.avancedtechnology.com/documents/Plan%20de%20Gobierno%202027-2030%20General.pdf"
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      "https://jcllerena.avancedtechnology.com/documents/Plan%20de%20Gobierno%202027-2030%20General.pdf"
    );
    alert("¡Enlace copiado al portapapeles!");
  };

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-brand-light pt-28 pb-20 text-[#1E1E1E]">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Botón Volver */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-brand-red hover:text-brand-red/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>

          {/* Tarjeta de Encabezado */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl mb-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-brand-gold font-bold text-xs uppercase tracking-widest bg-brand-light border border-brand-gold/20 px-3.5 py-1.5 rounded-full">
                  Hoja de Ruta Oficial
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
                  PLAN DE GOBIERNO 2027-2030
                </h1>
                <p className="text-gray-500 text-xs md:text-sm">
                  Distrito de Orcopampa - Movimiento Regional Arequipa Tradición y Futuro
                </p>
              </div>

              {/* Botón Descarga */}
              <a
                href="/documents/Plan de Gobierno 2027-2030 General.pdf"
                download
                className="inline-flex items-center gap-2 bg-brand-red text-white hover:bg-brand-red/90 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow"
              >
                <Download className="h-4 w-4" />
                Descargar PDF
              </a>
            </div>

            {/* Compartir */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600 font-semibold">
              <span>Compartir plan de gobierno:</span>
              <button
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-1 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 px-3 py-1.5 rounded-full transition-all"
              >
                <Share2 className="h-3 w-3" />
                WhatsApp
              </button>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-250 px-3 py-1.5 rounded-full transition-all"
              >
                Copiar Enlace
              </button>
            </div>
          </div>

          {/* Contenido Técnico del Plan */}
          <div className="space-y-10 text-sm md:text-base leading-relaxed text-gray-700">
            
            {/* Sección 1: Visión y Misión */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-3">
                Visión y Misión del Distrito
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-extrabold text-brand-red text-xs uppercase tracking-wider mb-1">
                    Nuestra Visión
                  </h4>
                  <p className="italic">
                    “Ser uno de los mejores distritos de la región con una gestión eficiente, una ciudad segura y un desarrollo sostenible, logrando contar con una alta calidad de vida tanto en el distrito como en sus anexos, mediante una administración transparente y eficiente de los activos públicos y del capital humano.”
                  </p>
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-red text-xs uppercase tracking-wider mb-1">
                    Nuestra Misión
                  </h4>
                  <p>
                    “La Municipalidad Distrital de Orcopampa tiene la misión de asegurar la gobernabilidad del distrito, coordinando y concertando de manera estratégica con los organismos públicos, el sector privado y la comunidad; a fin de lograr el desarrollo sostenido del distrito procurando el orden y la estabilidad necesaria para facilitar la convivencia, los valores, las tradiciones y las costumbres, así como promover condiciones favorables, planificando el desarrollo distrital, consolidando el principio de autoridad, la autonomía municipal y la aplicación de una gerencia pública eficaz.”
                  </p>
                </div>
              </div>
            </div>

            {/* Sección 2: Dimensiones de Desarrollo */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-3">
                Dimensiones Estratégicas del Desarrollo
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">
                    1. Dimensión Social
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Focalizada en erradicar la desnutrición y anemia, dotar de saneamiento integral y agua potable al 100% de los caseríos y anexos, y modernizar la oferta de salud local con un hospital de categoría II-1.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">
                    2. Dimensión Económica
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Reactivación pecuaria de camélidos (alpacas/llamas) y ovinos de doble propósito. Firma de convenios marco de valor compartido con el sector minero y generación masiva de empleo temporal mediante el plan 'Orcopampa a Trabajar'.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">
                    3. Dimensión Territorial (Ambiental)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Reforestación masiva de 5,000 árboles, optimización del recojo y valorización de residuos sólidos, repoblamiento de truchas en ríos del Altiplano, y pavimentación empedrada para reducir la suspensión de polvo en el agro y la salud.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">
                    4. Dimensión Institucional
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Rendición de cuentas obligatoria y transparente, implementación de la Ley de Servicio Civil (SERVIR), descentralización municipal con concejo itinerante en comunidades y comités de vigilancia vecinal vinculantes.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
