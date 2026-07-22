"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, FileText, CheckCircle2, Trash2, Edit3, Users, HelpCircle, Eye } from "lucide-react";

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_principal: string | null;
  fecha: string;
  autor: string;
  categoria: string;
  estado: "borrador" | "publicado";
}

interface Voluntario {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  comunidad_sector: string;
  forma_participacion: string;
  disponibilidad: string;
  fecha_registro: string;
}

interface Propuesta {
  id: number;
  nombre_completo: string;
  telefono: string;
  email: string | null;
  comunidad_sector: string;
  categoria: string;
  descripcion: string;
  fecha_envio: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"noticias" | "voluntarios" | "propuestas">("noticias");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  
  // Estados para el Formulario de Noticias
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("Campaña");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState<"borrador" | "publicado">("borrador");
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Cargar noticias del admin
      const resNoticias = await fetch("/api/admin/noticias");
      if (resNoticias.status === 401) {
        router.push("/admin/login");
        return;
      }
      const dataNoticias = await resNoticias.json();
      if (dataNoticias.success) {
        setNoticias(dataNoticias.noticias);
      }

      // Cargar propuestas y voluntarios de forma mockeada o endpoints seguros si existieran.
      // Dado que son confidenciales, el admin los lee directamente de la base de datos local
      // pero para simplificar, cargaremos un visor o placeholders.
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSaveNoticia = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: currentId,
      titulo,
      resumen,
      contenido,
      fecha,
      categoria,
      estado,
    };

    const method = currentId ? "PUT" : "POST";
    const res = await fetch("/api/admin/noticias", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setIsEditing(false);
      resetForm();
      loadData();
    } else {
      alert(data.error);
    }
  };

  const resetForm = () => {
    setCurrentId(null);
    setTitulo("");
    setResumen("");
    setContenido("");
    setCategoria("Campaña");
    setFecha("");
    setEstado("borrador");
  };

  const handleEditClick = (n: Noticia) => {
    setCurrentId(n.id);
    setTitulo(n.titulo);
    setResumen(n.resumen);
    setContenido(n.contenido);
    setCategoria(n.categoria);
    setFecha(n.fecha.substring(0, 10));
    setEstado(n.estado);
    setIsEditing(true);
  };

  const handleDeleteNoticia = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta noticia?")) return;
    const res = await fetch(`/api/admin/noticias?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Noticia eliminada.");
      loadData();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* Header Admin */}
      <header className="bg-zinc-900 border-b border-zinc-800 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="bg-brand-red text-white text-xs font-bold uppercase px-3 py-1 rounded-full border border-brand-gold/20">
            Admin Maestro
          </span>
          <h1 className="text-lg font-black tracking-wider uppercase">Orcopampa 2027</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full text-xs font-bold uppercase transition-colors"
        >
          <LogOut className="h-4 w-4 text-brand-red" />
          Cerrar Sesión
        </button>
      </header>

      {/* Tabs */}
      <div className="flex bg-zinc-900 border-b border-zinc-800">
        <button
          onClick={() => { setActiveTab("noticias"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "noticias" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <FileText className="h-4 w-4" />
          Noticias y Aprobación
        </button>
        <button
          onClick={() => { setActiveTab("voluntarios"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "voluntarios" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="h-4 w-4" />
          Voluntarios de Campaña
        </button>
        <button
          onClick={() => { setActiveTab("propuestas"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "propuestas" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          Propuestas Ciudadanas
        </button>
      </div>

      {/* Contenido Principal Dashboard */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="text-center py-20 text-zinc-500 font-semibold">
            Cargando información del panel...
          </div>
        ) : activeTab === "noticias" ? (
          <div className="space-y-6">
            {/* Cabecera Tab */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Gestión y Aprobación de Noticias</h2>
              {!isEditing && (
                <button
                  onClick={() => { resetForm(); setIsEditing(true); }}
                  className="bg-brand-red text-white hover:bg-brand-red/90 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow"
                >
                  <Plus className="h-4 w-4" />
                  Nueva Noticia
                </button>
              )}
            </div>

            {isEditing ? (
              /* Formulario Noticias */
              <form onSubmit={handleSaveNoticia} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-2xl mx-auto text-sm text-zinc-300">
                <h3 className="text-lg font-bold text-white">
                  {currentId ? "Editar Noticia" : "Redactar Nueva Noticia"}
                </h3>
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Título</label>
                  <input
                    type="text"
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Resumen</label>
                  <textarea
                    required
                    rows={2}
                    value={resumen}
                    onChange={(e) => setResumen(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Contenido HTML</label>
                  <textarea
                    required
                    rows={6}
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Fecha</label>
                    <input
                      type="date"
                      required
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Categoría</label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="Campaña">Campaña</option>
                      <option value="Prensa">Prensa</option>
                      <option value="Comunidades">Comunidades</option>
                      <option value="Turismo">Turismo</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Estado (Aprobación)</label>
                    <select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="borrador">Borrador (Oculto)</option>
                      <option value="publicado">Publicado (Aprobado)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-red text-white hover:bg-brand-red/90 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            ) : (
              /* Tabla Noticias */
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Título</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Autor</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {noticias.map((n) => (
                      <tr key={n.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4">{new Date(n.fecha).toLocaleDateString("es-ES")}</td>
                        <td className="px-6 py-4 font-bold text-white">{n.titulo}</td>
                        <td className="px-6 py-4">{n.categoria}</td>
                        <td className="px-6 py-4">{n.autor}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            n.estado === "publicado" ? "bg-[#25D366]/10 text-[#25D366]" : "bg-amber-500/10 text-amber-500"
                          }`}>
                            {n.estado === "publicado" ? "Aprobado" : "Borrador"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditClick(n)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                            title="Editar / Aprobar"
                          >
                            <Edit3 className="h-4 w-4 text-brand-gold" />
                          </button>
                          <button
                            onClick={() => handleDeleteNoticia(n.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4 text-brand-red" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : activeTab === "voluntarios" ? (
          /* Vista Voluntarios Placeholder (Confidencial) */
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-xl">
            <Users className="h-12 w-12 text-brand-gold mx-auto" />
            <h3 className="text-xl font-bold">Voluntarios Registrados</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              La lista de voluntarios y colaboradores contiene datos confidenciales protegidos por ley. 
              Puedes descargar y consultar el reporte completo de la base de datos de Hostinger de manera segura 
              desde phpMyAdmin usando tus credenciales de administrador.
            </p>
          </div>
        ) : (
          /* Vista Propuestas Placeholder (Confidencial) */
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-xl">
            <HelpCircle className="h-12 w-12 text-brand-gold mx-auto" />
            <h3 className="text-xl font-bold">Propuestas Ciudadanas</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Los aportes, sugerencias e información de contacto enviados por los vecinos se almacenan cifrados 
              en la base de datos en Hostinger. Puedes revisar la bandeja completa de manera privada ingresando 
              a tu gestor de base de datos MySQL.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
