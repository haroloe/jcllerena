"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión.");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20 mb-2">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Panel Administrativo</h1>
          <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
            Juan Carlos Llerena Alcalde
          </p>
        </div>

        {error && (
          <div className="p-3 bg-brand-red/10 border border-brand-red/25 text-brand-red rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jcllerena.com"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/35"
              />
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red text-white hover:bg-brand-red/90 py-3 rounded-full font-bold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Ingresar al Panel"}
          </button>
        </form>

      </div>
    </main>
  );
}
