"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const CATEGORIES = [
  "Agua y saneamiento",
  "Salud",
  "Educación",
  "Seguridad",
  "Empleo",
  "Ganadería",
  "Agricultura",
  "Turismo",
  "Infraestructura",
  "Medio ambiente",
  "Juventud",
  "Adulto mayor",
  "Otro",
];

const SECTORS = [
  "Orcopampa (Capital)",
  "Vizcacuto",
  "Choquetambo",
  "Marcani",
  "Calera",
  "Huimpilca",
  "Misapuquio",
  "Panahua",
  "Lontojoya",
  "Sausa Huancarama",
  "Huincocahua",
  "Otro sector",
];

export default function ProposalForm() {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    telefono: "",
    email: "",
    comunidad_sector: "",
    categoria: "",
    descripcion: "",
    acepta_privacidad: false,
    autoriza_whatsapp: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/propuestas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar el formulario.");
      }

      setSuccess(true);
      setFormData({
        nombre_completo: "",
        telefono: "",
        email: "",
        comunidad_sector: "",
        categoria: "",
        descripcion: "",
        acepta_privacidad: false,
        autoriza_whatsapp: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl max-w-xl mx-auto">
      {success ? (
        <div className="text-center py-10 space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] mb-2">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark">¡Propuesta Recibida!</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Muchas gracias por compartir tus ideas para el desarrollo de Orcopampa. Tus aportes serán evaluados 
            por nuestro equipo técnico para su inclusión en la agenda participativa.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-brand-red text-white hover:bg-brand-red/90 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            Enviar otra propuesta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-brand-dark">
              Tu Propuesta para Orcopampa
            </h3>
            <p className="text-xs text-gray-500">
              Registra tus ideas o problemáticas de tu sector de forma confidencial y directa al candidato.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-xl font-semibold text-xs">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div className="space-y-1">
            <label htmlFor="nombre_completo" className="block text-xs font-bold text-gray-600 uppercase">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="nombre_completo"
              name="nombre_completo"
              required
              value={formData.nombre_completo}
              onChange={handleChange}
              placeholder="Ej. Juan Quispe Mamani"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
            />
          </div>

          {/* Fila: Teléfono y Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="telefono" className="block text-xs font-bold text-gray-600 uppercase">
                Teléfono Celular *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej. 958123456"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej. juan@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
          </div>

          {/* Fila: Comunidad y Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="comunidad_sector" className="block text-xs font-bold text-gray-600 uppercase">
                Comunidad / Sector *
              </label>
              <select
                id="comunidad_sector"
                name="comunidad_sector"
                required
                value={formData.comunidad_sector}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35 bg-white"
              >
                <option value="">Selecciona sector...</option>
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="categoria" className="block text-xs font-bold text-gray-600 uppercase">
                Categoría Propuesta *
              </label>
              <select
                id="categoria"
                name="categoria"
                required
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35 bg-white"
              >
                <option value="">Selecciona eje...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1">
            <label htmlFor="descripcion" className="block text-xs font-bold text-gray-600 uppercase">
              Descripción de la Propuesta *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              required
              rows={4}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe detalladamente cuál es la necesidad o tu propuesta para mejorar..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
            ></textarea>
          </div>

          {/* Checkboxes de Privacidad */}
          <div className="space-y-2.5 pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
              <input
                type="checkbox"
                name="acepta_privacidad"
                required
                checked={formData.acepta_privacidad}
                onChange={handleChange}
                className="mt-0.5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
              />
              <span>
                Acepto que mi información sea tratada de forma confidencial exclusivamente para los fines técnicos de la campaña electoral. *
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
              <input
                type="checkbox"
                name="autoriza_whatsapp"
                checked={formData.autoriza_whatsapp}
                onChange={handleChange}
                className="mt-0.5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
              />
              <span>
                Autorizo al equipo de Juan Carlos Llerena a contactarme por WhatsApp para darme respuesta sobre mi propuesta.
              </span>
            </label>
          </div>

          {/* Botón Envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red/90 py-3 rounded-full font-bold uppercase tracking-wider transition-all shadow disabled:opacity-50 hover:scale-[1.01]"
          >
            {loading ? "Enviando..." : "Enviar Propuesta"}
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
