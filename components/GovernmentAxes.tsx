"use client";

import React, { useState } from "react";
import { Droplet, Heart, GraduationCap, ShieldAlert, Briefcase, Sprout, Compass, Map, Landmark, ChevronDown } from "lucide-react";

const AXES = [
  {
    id: 1,
    title: "Eje 1: Agua, Saneamiento e Infraestructura Básica",
    icon: Droplet,
    problem: "Déficit en el suministro continuo de agua potable de calidad y falta de Plantas de Tratamiento de Aguas Residuales (PETAR/PTAR) en la capital y anexos rurales.",
    proposal: "Ampliación y modernización del sistema de saneamiento integral del distrito y anexos.",
    actions: [
      "Instalar redes matrices y domiciliarias de agua potable.",
      "Construir PTAR centralizada y fosas sépticas depuradoras en anexos.",
      "Destrabar el mega-proyecto de saneamiento básico de la capital."
    ],
    beneficiaries: "Pobladores de Orcopampa y sus 9 Juntas de Administración Local (JAL).",
    meta: "100% de cobertura en agua potable y tratamiento ecológico de desagües.",
    allies: "Gobierno Regional de Arequipa (GRA), MVCS, Inversión Privada.",
    status: "Priorizado",
  },
  {
    id: 2,
    title: "Eje 2: Salud y Bienestar Social",
    icon: Heart,
    problem: "Limitada capacidad resolutiva del centro de salud actual, carencia de médicos especialistas y equipamiento biomédico obsoleto.",
    proposal: "Gestión para la creación e implementación del Hospital de categoría II-1 o II-2 en Orcopampa.",
    actions: [
      "Implementar equipamiento biomédico 24 horas y ambulancias Tipo B.",
      "Crear un centro asistencial/asilo para adultos mayores y huérfanos.",
      "Ejecutar programas contra la desnutrición crónica infantil y anemia."
    ],
    beneficiaries: "Madres, niños, adultos mayores y población vulnerable del distrito.",
    meta: "Estabilización de emergencias 24 horas y reducción del 50% de anemia infantil.",
    allies: "Ministerio de Salud (MINSA), PRONIS, Red de Salud Castilla.",
    status: "Priorizado",
  },
  {
    id: 3,
    title: "Eje 3: Educación, Tecnología y Juventud",
    icon: GraduationCap,
    problem: "Ausencia de oferta local de educación superior, obligando a los jóvenes a migrar a Arequipa por falta de oportunidades académicas.",
    proposal: "Implementación del plan 'ORCOPAMPA JOVEN' y gestión de filiales universitarias.",
    actions: [
      "Gestionar licencias de SUNEDU para sede universitaria o instituto superior.",
      "Equipar colegios con salas de cómputo y pizarras digitales interactivas con IA.",
      "Otorgar becas académicas y talleres de especialización para docentes."
    ],
    beneficiaries: "Estudiantes, jóvenes egresados y docentes de Orcopampa.",
    meta: "Implementación de una sede de educación superior y 100% de colegios digitalizados.",
    allies: "SUNEDU, Minedu, Universidades de Arequipa, Sindicato de Docentes.",
    status: "En evaluación",
  },
  {
    id: 4,
    title: "Eje 4: Seguridad Ciudadana",
    icon: ShieldAlert,
    problem: "Aumento de la delincuencia común y robos a predios rurales. Inseguridad climatológica por tormentas eléctricas recurrentes en zonas altoandinas.",
    proposal: "Implementación del plan 'ORCOPAMPA SEGURO' y red de pararrayos.",
    actions: [
      "Instalar una central de videovigilancia interconectada por fibra óptica.",
      "Implementar patrullaje preventivo de serenazgo coordinado con drones térmicos.",
      "Instalar red de pararrayos y alerta temprana en campos de pastoreo."
    ],
    beneficiaries: "Comunidad vecinal, ganaderos y transportistas.",
    meta: "Reducción del 60% en índices de robos y cero muertes por tormentas eléctricas.",
    allies: "Policía Nacional del Perú (PNP), Juntas Vecinales, Defensa Civil.",
    status: "Priorizado",
  },
  {
    id: 5,
    title: "Eje 5: Trabajo y Desarrollo Económico",
    icon: Briefcase,
    problem: "Desempleo juvenil y falta de dinamismo comercial de la micro y pequeña empresa (MYPE) local.",
    proposal: "Puesta en marcha del plan 'ORCOPAMPA A TRABAJAR' y convenios de empleabilidad.",
    actions: [
      "Generar empleo temporal para mano de obra no calificada en obras de administración directa.",
      "Establecer convenios con empresas mineras para priorizar empleo local calificado.",
      "Fomentar la formalización de MYPEs mediante campañas de simplificación administrativa."
    ],
    beneficiaries: "Jóvenes, mujeres cabezas de hogar y comerciantes del distrito.",
    meta: "1,500 empleos temporales generados al año con 50% de participación femenina.",
    allies: "Empresas mineras locales, Ministerio de Trabajo, gremios comerciales.",
    status: "Priorizado",
  },
  {
    id: 6,
    title: "Eje 6: Ganadería, Agricultura y Gestión del Agua",
    icon: Sprout,
    problem: "Pérdida estacional del recurso hídrico, precaria infraestructura hidráulica y baja competitividad agropecuaria de altura.",
    proposal: "Siembra y cosecha de agua, qochas, represas y tecnificación ganadera.",
    actions: [
      "Construir cochas, represas y estanques en cabeceras de cuenca.",
      "Implementar riego tecnificado (aspersión/goteo) y viveros de cobertura forrajera.",
      "Adquirir maquinaria agrícola municipal y repoblar truchas en ríos del distrito."
    ],
    beneficiaries: "Productores ganaderos de alpacas, vacunos, ovinos y agricultores de papa nativa.",
    meta: "3,000 hectáreas con riego optimizado y mejoramiento genético zootécnico al 100%.",
    allies: "MIDAGRI, Sierra Azul, ANA, Comunidades Campesinas.",
    status: "Priorizado",
  },
  {
    id: 7,
    title: "Eje 7: Turismo, Cultura e Identidad",
    icon: Compass,
    problem: "Desatención institucional en el posicionamiento y accesibilidad hacia los recursos turísticos y costumbristas locales.",
    proposal: "Plan 'ORCOPAMPA TURÍSTICA' e integración de corredores de aventura.",
    actions: [
      "Gestionar el circuito turístico Cotahuasi - Colca - Orcopampa - Valle de Volcanes.",
      "Poner en valor las cataratas de hielo, bosques de piedras y molinos coloniales.",
      "Fomentar el ecoturismo vivencial y capacitar en hospitalidad internacional."
    ],
    beneficiaries: "Operadores turísticos, artesanos, textileras y jóvenes del sector.",
    meta: "Registrar a Orcopampa como destino turístico de interés regional y triplicar visitantes.",
    allies: "MINCETUR, UNESCO (Geoparque Mundial), Agencias de Turismo de Arequipa.",
    status: "En evaluación",
  },
  {
    id: 8,
    title: "Eje 8: Ordenamiento Territorial y Formalización",
    icon: Map,
    problem: "Inseguridad jurídica sobre predios urbanos y rurales por falta de saneamiento físico-legal y delimitación catastral.",
    proposal: "Catastro municipal digital y titulación en convenio con comunidades campesinas.",
    actions: [
      "Elaborar el Plano Catastral digital del casco urbano y distrital.",
      "Firmar convenios de titulación rápida con COFOPRI.",
      "Gestionar la delimitación final de fronteras territoriales del distrito."
    ],
    beneficiaries: "Propietarios de viviendas, posesionarios y comuneros.",
    meta: "100% de predios urbanos saneados y con títulos inscritos en SUNARP.",
    allies: "COFOPRI, SUNARP, Comunidad Campesina de Orcopampa.",
    status: "En evaluación",
  },
  {
    id: 9,
    title: "Eje 9: Gobierno Transparente y Atención Ciudadana",
    icon: Landmark,
    problem: "Baja amabilidad de atención al usuario y percepción de falta de control sobre los fondos públicos municipales.",
    proposal: "Atención descentralizada, cabildos abiertos y control del plan en vivo.",
    actions: [
      "Descentralizar la municipalidad con ventanillas y Sesiones de Concejo Itinerantes.",
      "Implementar un portal digital interactivo de monitoreo de metas en tiempo real.",
      "Establecer un canal seguro para quejas, denuncias y sugerencias directo al alcalde."
    ],
    beneficiaries: "Toda la ciudadanía civil organizada de Orcopampa.",
    meta: "Cuatro cabildos abiertos al año y 100% de metas del plan de gobierno publicadas online.",
    allies: "Contraloría General de la República, Vecinos Organizados.",
    status: "Priorizado",
  },
];

export default function GovernmentAxes() {
  const [openAxis, setOpenAxis] = useState<number | null>(1);

  const toggleAxis = (id: number) => {
    setOpenAxis(openAxis === id ? null : id);
  };

  return (
    <section id="propuestas" className="py-20 bg-white text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
            EJES ESTRATÉGICOS DEL PLAN DE GOBIERNO
          </h2>
          <div className="w-24 h-1.5 bg-brand-red mx-auto rounded-full"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Nuestras propuestas se dividen en 9 ejes de desarrollo estructurados técnicamente. 
            Haz clic en cada eje para conocer el diagnóstico, las propuestas y las metas planteadas.
          </p>
        </div>

        {/* Acordeón de Ejes */}
        <div className="max-w-4xl mx-auto space-y-4">
          {AXES.map((axis) => {
            const IconComp = axis.icon;
            const isOpen = openAxis === axis.id;
            
            return (
              <div 
                key={axis.id}
                className="bg-brand-light rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-300"
              >
                {/* Cabecera del acordeón */}
                <button
                  onClick={() => toggleAxis(axis.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                      isOpen ? "bg-brand-red text-white" : "bg-white text-brand-dark shadow-sm border border-gray-150"
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="font-extrabold text-sm md:text-base text-brand-dark tracking-wide">
                      {axis.title}
                    </span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {/* Contenido desplegable */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[800px] border-t border-gray-200/50" : "max-h-0"
                }`}>
                  <div className="p-6 space-y-6 text-sm md:text-base">
                    
                    {/* Grid de Ejes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h5 className="font-extrabold text-brand-red uppercase tracking-wider text-xs">
                          Problema Detectado
                        </h5>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {axis.problem}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-extrabold text-brand-dark uppercase tracking-wider text-xs">
                          Nuestra Propuesta
                        </h5>
                        <p className="text-gray-700 leading-relaxed text-sm font-semibold">
                          {axis.proposal}
                        </p>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-brand-dark uppercase tracking-wider text-xs">
                        Acciones Técnicas
                      </h5>
                      <ul className="list-disc pl-5 space-y-1.5 text-gray-700 text-sm">
                        {axis.actions.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Metadatos y Metas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200/30 text-xs">
                      <div>
                        <span className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Beneficiarios
                        </span>
                        <span className="text-gray-800 font-semibold">{axis.beneficiaries}</span>
                      </div>
                      <div>
                        <span className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Meta del Plan
                        </span>
                        <span className="text-gray-800 font-semibold">{axis.meta}</span>
                      </div>
                      <div>
                        <span className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Aliados Estratégicos
                        </span>
                        <span className="text-gray-800 font-semibold">{axis.allies}</span>
                      </div>
                      <div>
                        <span className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Estado Eje
                        </span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          axis.status === "Priorizado" 
                            ? "bg-[#25D366]/10 text-[#25D366]" 
                            : "bg-blue-500/10 text-blue-500"
                        }`}>
                          {axis.status}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
