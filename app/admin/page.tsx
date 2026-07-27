"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, FileText, Calendar, Trash2, Edit3, Users, HelpCircle, Video, Image as ImageIcon, CheckCircle, XCircle, Archive, ShieldAlert, Key } from "lucide-react";

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_principal: string | null;
  tipo_medio: "foto" | "video";
  video_url: string | null;
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

interface Voluntario {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  comunidad_sector: string;
  edad: number | null;
  profesion_ocupacion: string;
  forma_participacion: string;
  disponibilidad: string;
  comentario: string | null;
  estado: "pendiente" | "aprobado" | "rechazado";
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
  estado: "pendiente" | "tomada_en_cuenta" | "archivada";
  fecha_envio: string;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "editor" | "revisor";
  fecha_registro: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"noticias" | "agenda" | "voluntarios" | "propuestas" | "usuarios">("noticias");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [agenda, setAgenda] = useState<Evento[]>([]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  
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
  const [tipoMedioNoticia, setTipoMedioNoticia] = useState<"foto" | "video">("foto");
  const [videoUrlNoticia, setVideoUrlNoticia] = useState("");
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

  // Estados para Formulario de Usuarios
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState<"admin" | "editor" | "revisor">("editor");

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === "noticias") {
        const res = await fetch("/api/admin/noticias");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success) setNoticias(data.noticias);
      } else if (activeTab === "agenda") {
        const res = await fetch("/api/admin/agenda");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success) setAgenda(data.agenda);
      } else if (activeTab === "voluntarios") {
        const res = await fetch("/api/admin/voluntarios");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success) setVoluntarios(data.voluntarios);
      } else if (activeTab === "propuestas") {
        const res = await fetch("/api/admin/propuestas");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success) setPropuestas(data.propuestas);
      } else if (activeTab === "usuarios") {
        const res = await fetch("/api/admin/usuarios");
        if (res.status === 451 || res.status === 403) {
          alert("Acceso denegado: Solo el Administrador Maestro puede gestionar accesos.");
          setActiveTab("noticias");
          return;
        }
        const data = await res.json();
        if (data.success) setUsuarios(data.usuarios);
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

    if (tipoMedioNoticia === "video") {
      if (!videoUrlNoticia) {
        alert("Por favor ingresa el enlace de YouTube.");
        return;
      }
      const lower = videoUrlNoticia.toLowerCase();
      if (!lower.includes("youtube.com") && !lower.includes("youtu.be")) {
        alert("El video debe ser un enlace válido de YouTube.");
        return;
      }
    }

    const payload = {
      id: currentId,
      titulo: tituloNoticia,
      resumen: resumenNoticia,
      contenido: contenidoNoticia,
      fecha: fechaNoticia,
      categoria: categoriaNoticia,
      imagen_principal: tipoMedioNoticia === "foto" ? (imagenNoticia || null) : null,
      tipo_medio: tipoMedioNoticia,
      video_url: tipoMedioNoticia === "video" ? (videoUrlNoticia || null) : null,
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
    setTipoMedioNoticia("foto");
    setVideoUrlNoticia("");
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
    setTipoMedioNoticia(n.tipo_medio || "foto");
    setVideoUrlNoticia(n.video_url || "");
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
    if (transmisionAgenda) {
      const lower = transmisionAgenda.toLowerCase();
      if (!lower.includes("youtube.com") && !lower.includes("youtu.be") && !lower.includes("drive.google.com")) {
        alert("Atención: El enlace de video debe ser de YouTube o Google Drive.");
        return;
      }
    }

    const payload = {
      id: currentId,
      titulo: tituloAgenda,
      fecha_hora: fechaHoraAgenda.replace("T", " ") + ":00",
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
    setFechaHoraAgenda(e.fecha_hora.substring(0, 16));
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
    if (!confirm("¿Estás seguro de eliminar esta actividad?")) return;
    const res = await fetch(`/api/admin/agenda?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Actividad eliminada.");
      loadData();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  // CRUD USUARIOS
  const handleSaveUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: currentId,
      nombre: nombreUsuario,
      email: emailUsuario,
      password: passwordUsuario,
      rol: rolUsuario,
    };

    const method = currentId ? "PUT" : "POST";
    const res = await fetch("/api/admin/usuarios", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setIsEditing(false);
      resetUsuarioForm();
      loadData();
    } else {
      alert(data.error);
    }
  };

  const resetUsuarioForm = () => {
    setCurrentId(null);
    setNombreUsuario("");
    setEmailUsuario("");
    setPasswordUsuario("");
    setRolUsuario("editor");
  };

  const handleEditUsuarioClick = (u: Usuario) => {
    setCurrentId(u.id);
    setNombreUsuario(u.nombre);
    setEmailUsuario(u.email);
    setPasswordUsuario(""); // se deja vacío si no se quiere cambiar
    setRolUsuario(u.rol);
    setIsEditing(true);
  };

  const handleDeleteUsuario = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este usuario del panel?")) return;
    const res = await fetch(`/api/admin/usuarios?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      loadData();
    } else {
      alert(data.error);
    }
  };

  // CONTROL VOLUNTARIOS
  const handleUpdateVoluntarioStatus = async (id: number, nuevoEstado: "aprobado" | "rechazado" | "pendiente") => {
    const res = await fetch("/api/admin/voluntarios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado: nuevoEstado }),
    });
    if (res.ok) {
      alert("Estado de voluntario actualizado.");
      loadData();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  // CONTROL PROPUESTAS
  const handleUpdatePropuestaStatus = async (id: number, nuevoEstado: "tomada_en_cuenta" | "archivada" | "pendiente") => {
    const res = await fetch("/api/admin/propuestas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado: nuevoEstado }),
    });
    if (res.ok) {
      alert("Estado de la propuesta actualizado.");
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
          Noticias
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
          Voluntarios ({voluntarios.length})
        </button>
        <button
          onClick={() => { setActiveTab("propuestas"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "propuestas" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          Propuestas ({propuestas.length})
        </button>
        <button
          onClick={() => { setActiveTab("usuarios"); setIsEditing(false); }}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "usuarios" ? "text-brand-gold border-b-2 border-brand-gold bg-zinc-950/40" : "text-zinc-400 hover:text-white"
          }`}
        >
          <ShieldAlert className="h-4 w-4" />
          Accesos / Usuarios
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Tipo de Recurso</label>
                    <select
                      value={tipoMedioNoticia}
                      onChange={(e) => setTipoMedioNoticia(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="foto">Foto Principal</option>
                      <option value="video">Video de YouTube</option>
                    </select>
                  </div>

                  {tipoMedioNoticia === "foto" ? (
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
                  ) : (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-400 uppercase">Enlace de Video de YouTube</label>
                      <div className="relative">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          value={videoUrlNoticia}
                          onChange={(e) => setVideoUrlNoticia(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                        />
                      </div>
                    </div>
                  )}
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
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Enlace Mapa Google Maps</label>
                    <input
                      type="text"
                      value={ubicacionAgenda}
                      onChange={(e) => setUbicacionAgenda(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Descripción</label>
                  <textarea
                    rows={3}
                    value={descripcionAgenda}
                    onChange={(e) => setDescripcionAgenda(e.target.value)}
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
                      Video Enlace (YouTube o Google Drive Link)
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
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Registro de Voluntarios de Campaña</h2>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Nombre y Apellidos</th>
                    <th className="px-6 py-4">Teléfono / Email</th>
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Forma Participación</th>
                    <th className="px-6 py-4">Disponibilidad</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {voluntarios.map((v) => (
                    <tr key={v.id} className="hover:bg-zinc-950/40">
                      <td className="px-6 py-4 font-bold text-white">
                        {v.nombre} {v.apellidos}
                        {v.edad && <span className="text-zinc-500 font-normal text-xs ml-1">({v.edad} años)</span>}
                        <div className="text-zinc-500 font-normal text-[10px] mt-0.5">Ocupación: {v.profesion_ocupacion}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{v.telefono}</div>
                        <div className="text-xs text-zinc-500">{v.email}</div>
                      </td>
                      <td className="px-6 py-4">{v.comunidad_sector}</td>
                      <td className="px-6 py-4 font-medium text-brand-gold">{v.forma_participacion}</td>
                      <td className="px-6 py-4 text-xs">{v.disponibilidad}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          v.estado === "aprobado"
                            ? "bg-[#25D366]/10 text-[#25D366]"
                            : v.estado === "rechazado"
                            ? "bg-brand-red/10 text-brand-red"
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {v.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateVoluntarioStatus(v.id, "aprobado")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 text-[#25D366]" />
                        </button>
                        <button
                          onClick={() => handleUpdateVoluntarioStatus(v.id, "rechazado")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 hover:bg-brand-red/20 transition-colors"
                        >
                          <XCircle className="h-4 w-4 text-brand-red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "propuestas" ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Propuestas y Necesidades de los Vecinos</h2>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Vecino / Contacto</th>
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Categoría Eje</th>
                    <th className="px-6 py-4">Descripción Propuesta</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {propuestas.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-950/40">
                      <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                        {p.nombre_completo}
                        <div className="text-zinc-500 font-semibold text-xs mt-0.5">{p.telefono}</div>
                        <div className="text-[10px] text-zinc-600 font-normal">{p.email || "Sin email"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.comunidad_sector}</td>
                      <td className="px-6 py-4 font-medium text-brand-gold whitespace-nowrap">{p.categoria}</td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-xs leading-relaxed text-zinc-350 break-words">{p.descripcion}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.estado === "tomada_en_cuenta"
                            ? "bg-[#25D366]/10 text-[#25D366]"
                            : p.estado === "archivada"
                            ? "bg-zinc-700 text-zinc-400"
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {p.estado === "tomada_en_cuenta" ? "Tomada en Cuenta" : p.estado === "archivada" ? "Archivada" : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdatePropuestaStatus(p.id, "tomada_en_cuenta")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 text-[#25D366]" />
                        </button>
                        <button
                          onClick={() => handleUpdatePropuestaStatus(p.id, "archivada")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                        >
                          <Archive className="h-4 w-4 text-zinc-450" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* CRUD USUARIOS PANEL */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Usuarios y Accesos al Panel</h2>
              {!isEditing && (
                <button
                  onClick={() => { resetUsuarioForm(); setIsEditing(true); }}
                  className="bg-brand-red text-white hover:bg-brand-red/90 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow"
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Usuario
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveUsuario} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-2xl mx-auto text-sm text-zinc-300">
                <h3 className="text-lg font-bold text-white">
                  {currentId ? "Editar Usuario" : "Registrar Nuevo Usuario"}
                </h3>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Email / Usuario</label>
                    <input
                      type="email"
                      required
                      value={emailUsuario}
                      onChange={(e) => setEmailUsuario(e.target.value)}
                      placeholder="ejemplo@jcllerena.com"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">Rol de Acceso</label>
                    <select
                      value={rolUsuario}
                      onChange={(e) => setRolUsuario(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    >
                      <option value="editor">Editor (Crea en borrador)</option>
                      <option value="revisor">Revisor (Edita y aprueba)</option>
                      <option value="admin">Administrador Maestro (Acceso Total)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-400 uppercase">
                    Contraseña {currentId && "(Dejar en blanco para no modificar)"}
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="password"
                      required={!currentId}
                      value={passwordUsuario}
                      onChange={(e) => setPasswordUsuario(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-white"
                    />
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
                      <th className="px-6 py-4">Nombre Completo</th>
                      <th className="px-6 py-4">Email / Usuario</th>
                      <th className="px-6 py-4">Rol</th>
                      <th className="px-6 py-4">Fecha Registro</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {usuarios.map((u) => (
                      <tr key={u.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 font-bold text-white">{u.nombre}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.rol === "admin"
                              ? "bg-brand-red/10 text-brand-red"
                              : u.rol === "revisor"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-zinc-700 text-zinc-300"
                          }`}>
                            {u.rol}
                          </span>
                        </td>
                        <td className="px-6 py-4">{new Date(u.fecha_registro).toLocaleDateString("es-ES")}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditUsuarioClick(u)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                          >
                            <Edit3 className="h-4 w-4 text-brand-gold" />
                          </button>
                          <button
                            onClick={() => handleDeleteUsuario(u.id)}
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
        )}
      </div>
    </main>
  );
}
