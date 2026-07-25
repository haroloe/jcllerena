"use client";

import React from "react";
import { Shield, Award, Heart, Users, Eye, Scale, HelpCircle } from "lucide-react";

const VALUES = [
  {
    name: "Honestidad",
    desc: "Trabajar y conducirse siempre con la verdad, siendo decente, razonable y justo en cada acción institucional.",
    icon: Shield,
  },
  {
    name: "Respeto",
    desc: "Reconocer, aceptar y valorar las cualidades del prójimo, sus derechos y los de la sociedad en su conjunto.",
    icon: Scale,
  },
  {
    name: "Solidaridad",
    desc: "Mantener colaboración constante con personas y comunidades, especialmente ante experiencias difíciles.",
    icon: Heart,
  },
  {
    name: "Trabajo en Equipo",
    desc: "Labor coordinada con comunidades campesinas, anexos comunales, sindicatos e instituciones.",
    icon: Users,
  },
  {
    name: "Transparencia",
    desc: "Procedimientos administrativos transparentes y de libre acceso para la fiscalización ciudadana en tiempo real.",
    icon: Eye,
  },
  {
    name: "Austeridad",
    desc: "Optimización del gasto administrativo para dirigir el presupuesto a las necesidades reales del pueblo.",
    icon: Award,
  },
];

export default function CandidateProfile() {
  return (
    <section id="biografia" className="py-20 bg-white text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
            CONOCE A JUAN CARLOS
          </h2>
          <div className="w-24 h-1.5 bg-brand-red mx-auto rounded-full"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Un hijo de Orcopampa, padre de familia y profesional comprometido con los valores del prójimo, 
            el desarrollo de la ganadería, la minería y el fomento del turismo.
          </p>
        </div>

        {/* Grid de Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Columna Izquierda: Texto Biográfico */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-dark">
              Biografía e Identidad Orcopampina
            </h3>
            <div className="text-gray-700 space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                <strong>Juan Carlos Llerena Huamani</strong> es hijo y padre orcopampino, con un sentimiento 
                profundo hacia la tierra que lo vio nacer. Su compromiso está guiado por el respeto a Dios y 
                al prójimo, valores inculcados en el seno familiar.
              </p>
              <p>
                Con experiencia en administración pública tras haber ejercido el liderazgo municipal del distrito, 
                entiende que la política es un servicio de humildad, transparencia y honradez. Su principal motivación 
                es potenciar las fortalezas y eliminar las amenazas estructurales en Orcopampa.
              </p>
              <p>
                Su propuesta no es un listado demagógico de promesas inviables, sino un plan estratégico supeditado 
                a los recursos del pliego y a una alta capacidad de gestión intergubernamental para atraer inversiones 
                del Gobierno Regional, Ministerios y Cooperación Internacional.
              </p>
            </div>
            <div className="bg-brand-light p-4 rounded-xl border-l-4 border-brand-gold text-sm text-gray-700 italic">
              “El objetivo de nuestro Plan de Gobierno es visualizar el destino de nuestro pueblo con los ejes Estratégicos, poder hacer cambios y mejoras en el Distrito para potenciar nuestras fortalezas.”
            </div>
          </div>

          {/* Columna Derecha: Imagen Artística o Composición */}
          <div className="relative aspect-video lg:aspect-square w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
            <img
              src="/perfil_de_facebook2.png"
              alt="Juan Carlos Llerena con la comunidad"
              className="object-cover w-full h-full object-center hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as any).src = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600";
              }}
            />
          </div>
        </div>

        {/* Sección de Valores Institucionales */}
        <div>
          <h3 className="text-2xl font-bold text-brand-dark text-center mb-10">
            Nuestros Valores Rectores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((val) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={val.name}
                  className="bg-brand-light p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-brand-gold/30 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-brand-red text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-dark mb-2">
                    {val.name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
