"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  message?: string;
}

export default function WhatsAppButton({ 
  message = "Hola, deseo recibir información sobre las propuestas de Juan Carlos Llerena para Orcopampa." 
}: WhatsAppButtonProps) {
  const phoneNumber = "51927586733";

  if (!phoneNumber) {
    return null;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA56] transition-all duration-300 hover:scale-110 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-semibold">
        Escríbenos
      </span>
    </a>
  );
}
