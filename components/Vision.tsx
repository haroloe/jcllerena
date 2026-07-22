"use client";

import React from "react";
import { Droplet, HeartPulse, GraduationCap, Cpu, Sprout, Briefcase, ShieldAlert, Compass, Landmark } from "lucide-react";

const VISION_CARDS = [
  {
    title: "Agua y Saneamiento 100%",
    desc: "Servicios básicos de agua, desagüe y PTAR operativos en la capital y anexos rurales.",
    icon: Droplet,
  },
  {
    title: "Hospital Categoría II-1",
    desc: "Infraestructura de salud moderna para atención y emergencias médicas las 24 horas.",
    icon: HeartPulse,
  },
  {
    title: "Educación y Tecnología",
    desc: "Equipamiento digital, salas de computación con IA y creación del Instituto/Universidad.",
    icon: GraduationCap,
  },
  {
    title: "Inteligencia Artificial",
    desc: "Sistemas tecnológicos integrados para el soporte educativo y seguridad vecinal.",
    icon: Cpu,
  },
  {
    title: "Desarrollo Agropecuario",
    desc: "Siembra y cosecha de agua en cabeceras de cuenca, riego tecnificado y ganadería zootécnica.",
    icon: Sprout,
  },
  {
    title: "Empleo Local",
    desc: "Prioridad absoluta de contratación de mano de obra local con inclusión a las mujeres.",
    icon: Briefcase,
  },
  {
    title: "Seguridad y Pararrayos",
    desc: "Cámaras interconectadas, drones térmicos y sistemas protectores contra tormentas eléctricas.",
    icon: ShieldAlert,
  },
  {
    title: "Corredor Turístico",
    desc: "Posicionamiento en la ruta Colca, Valle de los Volcanes e impulso al ecoturismo vivencial.",
    icon: Compass,
  },
  {
    title: "Transparencia Absoluta",
    desc: "Rendición de cuentas física-financiera y control a través de cabildos abiertos descentralizados.",
    icon: Landmark,
  },
];

export default function Vision() {
  return (
    <section id="vision" className="py-20 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Glows de fondo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full filter blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            Nuestros Ideales de Gestión
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            VISIÓN ORCOPAMPA 2030
          </h2>
          <div className="w-24 h-1.5 bg-brand-red mx-auto rounded-full"></div>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Nuestra hoja de ruta es consolidar a Orcopampa como un distrito productivo, seguro, transparente 
            y con alta calidad de vida en todas sus comunidades, caseríos y anexos.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VISION_CARDS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#1E1E1E]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl hover:border-brand-gold/30 hover:shadow-brand-gold/5 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-red text-white flex items-center justify-center mb-4 group-hover:scale-115 transition-transform duration-300">
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-gold mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
