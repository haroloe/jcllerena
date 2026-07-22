import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CandidateProfile from "@/components/CandidateProfile";
import Experience from "@/components/Experience";
import Vision from "@/components/Vision";
import GovernmentAxes from "@/components/GovernmentAxes";
import ProposalForm from "@/components/ProposalForm";
import VolunteerForm from "@/components/VolunteerForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      {/* Cabecera */}
      <Header />

      {/* Portada Principal (Hero) */}
      <main className="flex-1">
        <Hero />

        {/* Conoce a Juan Carlos (Biografía) */}
        <CandidateProfile />

        {/* Experiencia de Gestión 2018-2022 */}
        <Experience />

        {/* Visión Orcopampa 2030 */}
        <Vision />

        {/* Ejes del Plan de Gobierno */}
        <GovernmentAxes />

        {/* Sección de Participación Ciudadana (Formularios) */}
        <section id="participa" className="py-20 bg-brand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
                PARTICIPACIÓN CIUDADANA
              </h2>
              <div className="w-24 h-1.5 bg-brand-red mx-auto rounded-full"></div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Orcopampa se construye con la voz de sus vecinos. Envíanos tus propuestas o súmate como 
                voluntario para apoyarnos en la campaña electoral.
              </p>
            </div>

            {/* Grid de Formularios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Formulario 1: Propuesta */}
              <div className="space-y-4">
                <ProposalForm />
              </div>

              {/* Formulario 2: Voluntariado */}
              <div className="space-y-4">
                <VolunteerForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Botón Flotante de WhatsApp */}
      <WhatsAppButton />
    </>
  );
}
