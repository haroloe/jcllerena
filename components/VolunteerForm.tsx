"use client";

import React, { useState } from "react";
import { Users, CheckCircle } from "lucide-react";

const ROLES = [
  "Voluntariado",
  "Trabajo territorial",
  "Apoyo digital",
  "Comunicaciones",
  "Equipo técnico / Profesionales",
  "Juventudes",
  "Logística",
  "Personeros",
  "Prensa",
  "Fotografía y video",
  "Otro",
];

const AVAILABILITY = [
  "Tiempo completo",
  "Fines de semana",
  "Horas libres en la semana",
  "Por coordinar / Eventual",
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

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    comunidad_sector: "",
    edad: "",
    profesion_ocupacion: "",
    forma_participacion: "",
    disponibilidad: "",
    comentario: "",
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
      const response = await fetch("/api/voluntarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al registrar el voluntario.");
      }

      setSuccess(true);
      setFormData({
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        comunidad_sector: "",
        edad: "",
        profion_ocupacion: "",
        forma_participacion: "",
        disponibilidad: "",
        comentario: "",
        acepta_privacidad: false,
        autoriza_whatsapp: false,
      } as any);
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
          <h3 className="text-2xl font-bold text-brand-dark">¡Registro Completo!</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            ¡Muchas gracias por sumarte al gran equipo de campaña de Juan Carlos Llerena! Nos contactaremos 
            contigo a la brevedad por teléfono o WhatsApp para coordinar tu participación.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-brand-red text-white hover:bg-brand-red/90 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            Registrar a otro colaborador
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-brand-dark">
              Súmate al Equipo
            </h3>
            <p className="text-xs text-gray-500">
              Sé parte del cambio para Orcopampa. Únete como personero, equipo técnico o coordinador local.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-xl font-semibold text-xs">
              {error}
            </div>
          )}

          {/* Fila: Nombre y Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="nombre" className="block text-xs font-bold text-gray-600 uppercase">
                Nombres *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. María"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="apellidos" className="block text-xs font-bold text-gray-600 uppercase">
                Apellidos *
              </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                required
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej. Flores Mamani"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
          </div>

          {/* Fila: Teléfono y Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="v_telefono" className="block text-xs font-bold text-gray-600 uppercase">
                Teléfono Celular *
              </label>
              <input
                type="tel"
                id="v_telefono"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej. 958654321"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="v_email" className="block text-xs font-bold text-gray-600 uppercase">
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="v_email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej. maria@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
          </div>

          {/* Fila: Comunidad y Edad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="v_comunidad_sector" className="block text-xs font-bold text-gray-600 uppercase">
                Comunidad / Sector *
              </label>
              <select
                id="v_comunidad_sector"
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
              <label htmlFor="edad" className="block text-xs font-bold text-gray-600 uppercase">
                Edad (Opcional)
              </label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Ej. 25"
                min="18"
                max="99"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
          </div>

          {/* Profesión y Ocupación */}
          <div className="space-y-1">
            <label htmlFor="profesion_ocupacion" className="block text-xs font-bold text-gray-600 uppercase">
              Profesión u Ocupación *
            </label>
            <input
              type="text"
              id="profesion_ocupacion"
              name="profesion_ocupacion"
              required
              value={formData.profesion_ocupacion}
              onChange={handleChange}
              placeholder="Ej. Agrónomo / Estudiante"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
            />
          </div>

          {/* Fila: Forma de participación y disponibilidad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="forma_participacion" className="block text-xs font-bold text-gray-600 uppercase">
                Forma de Participación *
              </label>
              <select
                id="forma_participacion"
                name="forma_participacion"
                required
                value={formData.forma_participacion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35 bg-white"
              >
                <option value="">Selecciona rol...</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="disponibilidad" className="block text-xs font-bold text-gray-600 uppercase">
                Disponibilidad *
              </label>
              <select
                id="disponibilidad"
                name="disponibilidad"
                required
                value={formData.disponibilidad}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/35 bg-white"
              >
                <option value="">Selecciona disponibilidad...</option>
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comentario */}
          <div className="space-y-1">
            <label htmlFor="comentario" className="block text-xs font-bold text-gray-600 uppercase">
              Comentario o Mensaje Adicional
            </label>
            <textarea
              id="comentario"
              name="comentario"
              rows={3}
              value={formData.comentario}
              onChange={handleChange}
              placeholder="Indica algún comentario o cómo consideras que puedes aportar al equipo..."
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
                Acepto que mi información sea tratada de forma confidencial y conforme a las políticas de protección de datos personales. *
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
                Autorizo al equipo electoral a contactarme por WhatsApp para coordinar brigadas, reuniones y actividades territoriales.
              </span>
            </label>
          </div>

          {/* Botón Envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red/90 py-3 rounded-full font-bold uppercase tracking-wider transition-all shadow disabled:opacity-50 hover:scale-[1.01]"
          >
            {loading ? "Registrando..." : "Unirme al Equipo"}
            <Users className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
