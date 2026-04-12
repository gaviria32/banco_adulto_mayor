import React, { useState, useEffect } from 'react';
import { Volume2, Bot } from 'lucide-react';
import { Screen } from '../types';

const MESSAGES: Record<Screen, string> = {
  LOGIN: "Hola. Bienvenido a Mi Banco móvil. Por favor, toque el botón grande en el centro para ingresar a su cuenta de forma segura.",
  HOME: "Pantalla de inicio. En la parte de arriba tiene su saldo disponible. Abajo encontrará los botones para enviar dinero, pagar recibos, ver sus movimientos, recargar celular, retirar efectivo y ayuda.",
  MOVEMENTS: "Mis movimientos. Aquí puede ver en qué ha usado su dinero. Los valores que tienen el signo MÁS representan dinero que entró a su cuenta, y los valores con el signo MENOS son pagos o compras que usted realizó.",
  SEND_STEP_1: "Enviar dinero, paso uno. Seleccione a qué familiar o amigo desea enviarle plata tocando su nombre, o busque un contacto nuevo en la parte de arriba.",
  SEND_STEP_2: "Enviar dinero, paso dos. Escriba el valor que quiere mandar usando el teclado numérico de la pantalla y luego oprima el botón continuar.",
  SEND_STEP_3: "Enviar dinero, paso final. Revise con calma que el nombre y el valor sean correctos. Si todo está bien, oprima el botón grande que dice Enviar dinero ahora.",
  PAY_STEP_1: "Pagar recibos, paso uno. Toque el botón de buscar para escribir el nombre de la empresa, o use el botón de la cámara para escanear el código de su factura.",
  PAY_STEP_2: "Pagar recibos, paso dos. Verifique que el valor coincida con su factura física. Si es correcto, oprima el botón de confirmar pago para quedar al día.",
  HELP: "Centro de ayuda. Oprima el botón de Llamar a un Asesor para soporte directo del banco, o el botón de Llamar a un Familiar para hablar con su hijo Carlos.",
  SETTINGS: "Ajustes del sistema. Use la barra para cambiar el tamaño de la letra. También puede activar el diseño simple, poner avisos de pago, o activar alertas de seguridad.",
  RECHARGE_STEP_1: "Recargar celular. Seleccione su empresa de telefonía para poder ponerle saldo a su línea.",
  RECHARGE_STEP_2: "Recarga, paso final. Escriba su número de celular y elija uno de los valores de dinero que aparecen abajo. Luego toque el botón para confirmar.",
  WITHDRAW_STEP_1: "Retirar sin tarjeta. Oprima el botón grande para generar su código de seguridad. El sistema podría solicitar su huella digital por seguridad.",
  WITHDRAW_STEP_2: "Código generado. Use este número grande en el cajero del banco. Recuerde que tiene 30 minutos para usarlo y puede retirar el monto que desee.",
  SERVICES: "Sección de servicios. Aquí encontrará opciones para recargar celular, retirar efectivo, hablar con asesor, ver préstamos, seguros, certificados y ahorros.",
  LOANS_SCREEN: "Mis préstamos. Aquí puede ver cuánto dinero debe y cuándo es su próximo pago. También puede solicitar información para un préstamo nuevo.",
  INSURANCE_SCREEN: "Mis seguros. Aquí puede ver sus protecciones de salud y hogar activas. Hay un botón grande para pedir asistencia inmediata en caso de emergencia.",
  CERTS_SCREEN: "Certificados. Generación de documentos legales. Toque sobre cualquier opción para que el documento se guarde en su celular automáticamente.",
  INVEST_SCREEN: "Inversiones. Aquí puede ver el dinero ahorrado en su CDT y las ganancias que ha generado este mes."
};

export default function VoiceAssistant({ currentScreen }: { currentScreen: Screen }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Detener la voz si cambian de pantalla o se desmonta
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentScreen]);

  const handleToggle = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const msg = MESSAGES[currentScreen] || "Bienvenido.";
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = 'es-ES'; // O es-MX, es-CO, depende del navegador, usamos español por defecto
      utterance.rate = 0.85; // Un poco más lento para mejor comprensión
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.cancel(); // Parar cualquier otra lectura
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className={`fixed bottom-[90px] right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all z-[100] ${
        isPlaying 
          ? 'bg-secondary text-white scale-110 shadow-[0_0_20px_rgba(4,107,94,0.5)]' 
          : 'bg-primary-container text-white active:scale-95'
      }`}
      aria-label="Asistente de voz"
    >
      {isPlaying ? <Volume2 className="w-8 h-8 animate-pulse" /> : <Bot className="w-8 h-8" />}
    </button>
  );
}
