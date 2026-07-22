"use client";

import React, { useState } from "react";
import { CheckCircle2, PlayCircle, FolderOpen, DollarSign, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Saneamiento Básico y Alcantarillado",
    category: "Obra Concluida",
    desc: "Instalación de redes de agua potable y colectores principales en la Junta de Administración Local de Vizcacuto y Choquetambo.",
    details: "Benefició a más de 1,200 pobladores, reduciendo en un 35% los índices de enfermedades diarreicas agudas.",
    icon: CheckCircle2,
    color: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20",
  },
  {
    title: "Empedrado y Pavimentación Urbana",
    category: "Obra Iniciada",
    desc: "Pavimentación rígida y empedrado rústico de las vías vecinales principales del distrito de Orcopampa.",
    details: "Primera etapa concluida. Dejado listo para continuidad de asfalto hacia Panahua y Sausa Huancarama.",
    icon: PlayCircle,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    title: "Expediente Técnico de Hospital de Orcopampa",
    category: "Expediente Elaborado",
    desc: "Elaboración rigurosa del perfil y expediente técnico completo para el centro de salud de categoría II-1.",
    details: "Aprobado por el Ministerio de Salud y dejado listo para el apalancamiento financiero regional.",
    icon: FolderOpen,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    title: "Financiamiento de Mini-Represas en Alturas",
    category: "Financiamiento Obtenido",
    desc: "Obtención de presupuesto del MIDAGRI (Sierra Azul) para represamientos y cochas de siembra de agua.",
    details: "Monto total de 4.2 millones de soles asegurado para la irrigación de pastos naturales ganaderos.",
    icon: DollarSign,
    color: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  },
  {
    title: "Convenio Marco con el Sector Minero",
    category: "Proyecto Gestionado",
    desc: "Firma del Convenio Marco de Desarrollo con empresas mineras locales para transferencias voluntarias.",
    details: "Canalizado para proyectos agrícolas, capacitación técnica y becas de estudio universitarias.",
    icon: ExternalLink,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
];

const CATEGORIES = ["Todos", "Obra Concluida", "Obra Iniciada", "Proyecto Gestionado", "Expediente Elaborado", "Financiamiento Obtenido"];

export default function Experience() {
  const [activeTab, setActiveTab] = useState("Todos");

  const filteredProjects = activeTab === "Todos"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="experiencia" className="py-20 bg-brand-light text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
            EXPERIENCIA DE GESTIÓN (2018-2022)
          </h2>
          <div className="w-24 h-1.5 bg-brand-red mx-auto rounded-full"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Nuestra anterior gestión municipal se caracterizó por la eficiencia en pre-inversión y la obtención 
            de presupuestos estratégicos. Conoce los proyectos y expedientes técnicos reales.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all border ${
                activeTab === cat
                  ? "bg-brand-red text-white border-brand-red shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Logros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="space-y-4">
                  {/* Tag de Categoría */}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${p.color}`}>
                    <IconComp className="h-3 w-3" />
                    {p.category}
                  </span>
                  
                  <h4 className="text-lg font-bold text-brand-dark group-hover:text-brand-red transition-colors">
                    {p.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 italic">
                  {p.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota aclaratoria */}
        <div className="mt-12 text-center text-xs text-gray-400 max-w-lg mx-auto">
          * Los datos de esta sección son provisionales y sirven para demostrar el diseño de la plataforma. 
          Los archivos finales y actas de liquidación serán cargados tras su aprobación.
        </div>

      </div>
    </section>
  );
}
