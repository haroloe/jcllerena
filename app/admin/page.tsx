"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, FileText, Calendar, Trash2, Edit3, Users, HelpCircle, Video, Image as ImageIcon } from "lucide-react";

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

interface Evento {
  id: number;
  titulo: string;
  fecha_hora: string;
  lugar: string;
  comunidad_sector: string;
  descripcion: string | null;
  imagen_url: string | null;
  ubicacion_url: string | null;
  transmision_url: string | null;
  estado: "programado" | "concluido" | "cancelado";
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"noticias" | "agenda" | "voluntarios" | "propuestas">("noticias");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [agenda, setAgenda] = useState<Evento[]>([]);
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Estado de Edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Estados para Formulario de Noticias
  const [tituloNoticia, setTituloNoticia] = useState("");
  const [resumenNoticia, setResumenNoticia] = useState("");
  const [contenidoNoticia, setContenidoNoticia] = useState("");
  const [categoriaNoticia, setCategoriaNoticia] = useState("Campaña");
  const [fechaNoticia, setFechaNoticia] = useState("");
  const [imagenNoticia, setImagenNoticia] = useState("");
  const [estadoNoticia, setEstadoNoticia] = useState<"borrador" | "publicado">("borrador");

  // Estados para Formulario de Agenda
  const [tituloAgenda, setTituloAgenda] = useState("");
  const [fechaHoraAgenda, setFechaHoraAgenda] = useState("");
  const [lugarAgenda, setLugarAgenda] = useState("");
  const [sectorAgenda, setSectorAgenda] = useState("Orcopampa (Capital)");
  const [descripcionAgenda, setDescripcionAgenda] = useState("");
  const [imagenAgenda, setImagenAgenda] = useState("");
  const [ubicacionAgenda, setUbicacionAgenda] = useState("");
  const [transmisionAgenda, setTransmisionAgenda] = useState("");
  const [estadoAgenda, setEstadoAgenda] = useState<"programado" | "concluido" | "cancelado">("programado");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Cargar Noticias
      const resNoticias = await fetch("/api/admin/noticias");
      if (resNoticias.status === 401) {
        router.push("/admin/login");
        return;
      }
      const dataNoticias = await resNoticias.json();
      if (dataNoticias.success) {
        setNoticias(dataNoticias.noticias);
      }

      // 2. Cargar Agenda
      const resAgenda = await fetch("/api/admin/agenda");
      const dataAgenda = await resAgenda.json();
      if (dataAgenda.success) {
        setAgenda(dataAgenda.agenda);
      }
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

  // CRUD NOTICIAS
  const handleSaveNoticia = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: currentId,
      titulo: tituloNoticia,
      resumen: resumenNoticia,
      contenido: contenidoNoticia,
      fecha: fechaNoticia,
      categoria: categoriaNoticia,
      imagen_principal: imagenNoticia || null,
      estado: estadoNoticia,
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
      resetNoticiaForm();
      loadData();
    } else {
      alert(data.error);
    }
  };

  const resetNoticiaForm = () => {
    setCurrentId(null);
    setTituloNoticia("");
    setResumenNoticia("");
    setContenidoNoticia("");
    setCategoriaNoticia("Campaña");
    setFechaNoticia("");
    setImagenNoticia("");
    setEstadoNoticia("borrador");
  };

  const handleEditNoticiaClick = (n: Noticia) => {
    setCurrentId(n.id);
    setTituloNoticia(n.titulo);
    setResumenNoticia(n.resumen);
    setContenidoNoticia(n.contenido);
    setCategoriaNoticia(n.categoria);
    setFechaNoticia(n.fecha.substring(0, 10));
    setImagenNoticia(n.imagen_principal || "");
    setEstadoNoticia(n.estado);
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

  // CRUD AGENDA
  const handleSaveAgenda = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar enlaces de video (YouTube / Drive) si se provee
    if (transmisionAgenda) {
      const lower = transmisionAgenda.toLowerCase();
      if (!lower.includes("youtube.com") && !lower.includes("youtu.be") && !lower.includes("drive.google.com")) {
        alert("Atención: El enlace de video debe ser de YouTube o Google Drive (no archivos locales).");
        return;
      }
    }

    const payload = {
      id: currentId,
      titulo: tituloAgenda,
      fecha_hora: fechaHoraAgenda.replace("T", " ") + ":00", // formatear para datetime de MySQL
      lugar: lugarAgenda,
      comunidad_sector: sectorAgenda,
      descripcion: descripcionAgenda || null,
      imagen_url: imagenAgenda || null,
      ubicacion_url: ubicacionAgenda || null,
      transmision_url: transmisionAgenda || null,
      estado: estadoAgenda,
    };

    const method = currentId ? "PUT" : "POST";
    const res = await fetch("/api/admin/agenda", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setIsEditing(false);
      resetAgendaForm();
      loadData();
    } else {
      alert(data.error);
    }
  };

  const resetAgendaForm = () => {
    setCurrentId(null);
    setTituloAgenda("");
    setFechaHoraAgenda("");
    setLugarAgenda("");
    setSectorAgenda("Orcopampa (Capital)");
    setDescripcionAgenda("");
    setImagenAgenda("");
    setUbicacionAgenda("");
    setTransmisionAgenda("");
    setEstadoAgenda("programado");
  };

  const handleEditAgendaClick = (e: Evento) => {
    setCurrentId(e.id);
    setTituloAgenda(e.titulo);
    setFechaHoraAgenda(e.fecha_hora.substring(0, 16)); // YYYY-MM-DDTHH:MM
    setLugarAgenda(e.lugar);
    setSectorAgenda(e.comunidad_sector);
    setDescripcionAgenda(e.descripcion || "");
    setImagenAgenda(e.imagen_url || "");
    setUbicacionAgenda(e.ubicacion_url || "");
    setTransmisionAgenda(e.transmision_url || "");
    setEstadoAgenda(e.estado);
    setIsEditing(true);
  };

  const handleDeleteAgenda = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta actividad de la agenda?")) return;
    const res = await fetch(`/api/admin/agenda?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Actividad de la agenda eliminada.");
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
          onClick={() => { setActiveTab("agenda"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "agenda" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Calendar className="h-4 w-4" />
          Agenda y Actividades
        </button>
        <button
          onClick={() => { setActiveTab("voluntarios"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "voluntarios" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="h-4 w-4" />
          Voluntarios
        </button>
        <button
          onClick={() => { setActiveTab("propuestas"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "propuestas" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          Propuestas
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Gestión y Aprobación de Noticias</h2>
              {!isEditing && (
                <button
                  onClick={() => { resetNoticiaForm(); setIsEditing(true); }}
                  className="bg-brand-red text-white hover:bg-brand-red/90 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow"
                >
                  <Plus className="h-4 w-4" />
                  Nueva Noticia
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveNoticia} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-2xl mx-auto text-sm text-zinc-300">
                <h3 className="text-lg font-bold text-white">
                  {currentId ? "Editar Noticia" : "Redactar Nueva Noticia"}
                </h3>
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Título</label>
                  <input
                    type="text"
                    required
                    value={tituloNoticia}
                    onChange={(e) => setTituloNoticia(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Resumen</label>
                  <textarea
                    required
                    rows={2}
                    value={resumenNoticia}
                    onChange={(e) => setResumenNoticia(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Contenido HTML</label>
                  <textarea
                    required
                    rows={6}
                    value={contenidoNoticia}
                    onChange={(e) => setContenidoNoticia(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Ruta / Enlace Imagen Principal</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={imagenNoticia}
                      onChange={(e) => setImagenNoticia(e.target.value)}
                      placeholder="/FOTOS/foto1.jpeg o URL externa"
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Fecha</label>
                    <input
                      type="date"
                      required
                      value={fechaNoticia}
                      onChange={(e) => setFechaNoticia(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Categoría</label>
                    <select
                      value={categoriaNoticia}
                      onChange={(e) => setCategoriaNoticia(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="Campaña">Campaña</option>
                      <option value="Prensa">Prensa</option>
                      <option value="Comunidades">Comunidades</option>
                      <option value="Turismo">Turismo</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Estado</label>
                    <select
                      value={estadoNoticia}
                      onChange={(e) => setEstadoNoticia(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="borrador">Borrador (Pendiente)</option>
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
                            onClick={() => handleEditNoticiaClick(n)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                          >
                            <Edit3 className="h-4 w-4 text-brand-gold" />
                          </button>
                          <button
                            onClick={() => handleDeleteNoticia(n.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
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
        ) : activeTab === "agenda" ? (
          /* CRUD AGENDA */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Agenda de Actividades de Campaña</h2>
              {!isEditing && (
                <button
                  onClick={() => { resetAgendaForm(); setIsEditing(true); }}
                  className="bg-brand-red text-white hover:bg-brand-red/90 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow"
                >
                  <Plus className="h-4 w-4" />
                  Nueva Actividad
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveAgenda} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-2xl mx-auto text-sm text-zinc-300">
                <h3 className="text-lg font-bold text-white">
                  {currentId ? "Editar Actividad" : "Programar Nueva Actividad"}
                </h3>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Título de Actividad</label>
                  <input
                    type="text"
                    required
                    value={tituloAgenda}
                    onChange={(e) => setTituloAgenda(e.target.value)}
                    placeholder="Ej. Encuentro Vecinal en Vizcacuto"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Fecha y Hora</label>
                    <input
                      type="datetime-local"
                      required
                      value={fechaHoraAgenda}
                      onChange={(e) => setFechaHoraAgenda(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Sector / Comunidad</label>
                    <select
                      value={sectorAgenda}
                      onChange={(e) => setSectorAgenda(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="Orcopampa (Capital)">Orcopampa (Capital)</option>
                      <option value="Vizcacuto">Vizcacuto</option>
                      <option value="Choquetambo">Choquetambo</option>
                      <option value="Marcani">Marcani</option>
                      <option value="Calera">Calera</option>
                      <option value="Huimpilca">Huimpilca</option>
                      <option value="Misapuquio">Misapuquio</option>
                      <option value="Panahua">Panahua</option>
                      <option value="Lontojoya">Lontojoya</option>
                      <option value="Sausa Huancarama">Sausa Huancarama</option>
                      <option value="Huincocahua">Huincocahua</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Lugar Específico</label>
                    <input
                      type="text"
                      required
                      value={lugarAgenda}
                      onChange={(e) => setLugarAgenda(e.target.value)}
                      placeholder="Ej. Plaza Principal de Vizcacuto s/n"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Enlace Mapa Google Maps (Ubicación)</label>
                    <input
                      type="text"
                      value={ubicacionAgenda}
                      onChange={(e) => setUbicacionAgenda(e.target.value)}
                      placeholder="URL del mapa"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Descripción / Detalles de Actividad</label>
                  <textarea
                    rows={3}
                    value={descripcionAgenda}
                    onChange={(e) => setDescripcionAgenda(e.target.value)}
                    placeholder="Detalles sobre la mesa de trabajo o agenda del evento..."
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Ruta / Enlace Imagen Promocional</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={imagenAgenda}
                      onChange={(e) => setImagenAgenda(e.target.value)}
                      placeholder="/FOTOS/foto2.jpeg o enlace externo"
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                      <Video className="h-4 w-4 text-zinc-500" />
                      Video Enlace (Solo YouTube o Google Drive Link)
                    </label>
                    <input
                      type="text"
                      value={transmisionAgenda}
                      onChange={(e) => setTransmisionAgenda(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Estado Actividad</label>
                    <select
                      value={estadoAgenda}
                      onChange={(e) => setEstadoAgenda(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="programado">Programado</option>
                      <option value="concluido">Concluido</option>
                      <option value="cancelado">Cancelado</option>
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
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4">Fecha y Hora</th>
                      <th className="px-6 py-4">Título</th>
                      <th className="px-6 py-4">Lugar</th>
                      <th className="px-6 py-4">Sector</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {agenda.map((e) => (
                      <tr key={e.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4">{new Date(e.fecha_hora).toLocaleString("es-ES")}</td>
                        <td className="px-6 py-4 font-bold text-white">{e.titulo}</td>
                        <td className="px-6 py-4">{e.lugar}</td>
                        <td className="px-6 py-4">{e.comunidad_sector}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            e.estado === "programado" ? "bg-[#25D366]/10 text-[#25D366]" : e.estado === "concluido" ? "bg-zinc-700 text-zinc-300" : "bg-brand-red/10 text-brand-red"
                          }`}>
                            {e.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditAgendaClick(e)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                          >
                            <Edit3 className="h-4 w-4 text-brand-gold" />
                          </button>
                          <button
                            onClick={() => handleDeleteAgenda(e.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
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
