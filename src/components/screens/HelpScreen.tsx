import React, { useState } from 'react';
import { Phone, Users, Video, ChevronRight, ShieldAlert, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HelpScreen() {
  const [calling, setCalling] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "No sé cómo ver mi plata o saldo",
      a: "Su saldo siempre está en la parte de arriba de la pantalla principal (Inicio) acompañado del símbolo de pesos ($)."
    },
    {
      q: "Me equivoqué enviando dinero, ¿qué hago?",
      a: "Mantenga la calma. Oprima el botón azul grande de 'Llamar a un humano' en la parte de arriba de esta pantalla para cancelar el envío antes de que llegue a otra persona."
    },
    {
      q: "¿Dónde está el cajero más cercano?",
      a: "Si desea retirar efectivo, su cajero afiliado más cercano puede encontrarlo oprimiendo el botón de 'Retirar efectivo' que está en la pantalla inicial."
    },
    {
      q: "Creo que me robaron o estafaron",
      a: "Llama a tu familiar usando el botón rojo, o contacta a nuestros asesores. Bloquearemos tu cuenta temporalmente para proteger todos tus ahorros."
    }
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-on-surface">Centro de Ayuda</h1>
        <p className="text-xl text-on-surface-variant font-medium">Estamos aquí para acompañarte paso a paso.</p>
      </div>

      {/* Main Action Grid - Human Support */}
      <section className="space-y-6">
        <button 
          onClick={() => setCalling(true)}
          className="flex flex-col items-center justify-center gap-4 w-full h-[200px] bg-primary text-white rounded-[2.5rem] shadow-xl active:scale-[0.98] transition-all p-8 border-4 border-transparent"
        >
          <HeartHandshake className="w-20 h-20 fill-white/20 text-white" />
          <div className="space-y-1 text-center">
            <span className="text-3xl font-black block leading-none">Llamar a un humano</span>
            <span className="text-[1.25rem] font-bold text-white/90 block">Hable con un asesor ahora (Gratis)</span>
          </div>
        </button>

        <button 
          onClick={() => setCalling(true)}
          className="flex flex-col items-center justify-center gap-4 w-full h-[160px] bg-white border-[3px] border-secondary text-secondary rounded-[2.5rem] shadow-md active:scale-[0.98] transition-all p-6"
        >
          <Users className="w-14 h-14" />
          <div className="space-y-1 text-center">
            <span className="text-2xl font-black block">Llamar a mi familiar</span>
            <span className="text-xl font-bold text-on-surface-variant block">(Carlos - Hijo Mayor)</span>
          </div>
        </button>
      </section>

      {/* Video Guide */}
      <section>
        <button className="flex items-center gap-6 w-full bg-surface-container-low border-2 border-outline-variant/30 text-on-surface rounded-[2rem] shadow-sm active:scale-[0.98] transition-transform p-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Video className="w-10 h-10 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-bold tracking-tight">Clases en video</span>
            <span className="text-lg text-on-surface-variant font-medium">Aprende a usar la aplicación de forma fácil y segura.</span>
          </div>
        </button>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black text-primary px-2 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8" />
          Preguntas Comunes
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="bg-surface-container-lowest rounded-2xl border-2 border-outline-variant/20 hover:border-primary/40 flex flex-col cursor-pointer transition-all shadow-sm overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between active:bg-surface-container-low transition-colors">
                <span className={`text-[1.375rem] font-bold leading-snug pr-6 transition-colors ${openFaq === index ? 'text-primary' : 'text-on-surface'}`}>{faq.q}</span>
                <ChevronRight className={`text-primary w-10 h-10 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
              </div>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6"
                  >
                    <div className="pb-6 pt-2 border-t border-outline-variant/30">
                      <p className="text-[1.125rem] text-on-surface-variant font-medium leading-relaxed mt-4">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fake Calling Overlay */}
      <AnimatePresence>
        {calling && (
          <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center space-y-12"
            >
              <div className="w-40 h-40 rounded-full bg-secondary/20 flex items-center justify-center relative animate-pulse">
                <Phone className="w-20 h-20 text-secondary" />
                <div className="absolute inset-0 rounded-full border-4 border-secondary animate-ping" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-white">Llamando...</h2>
                <p className="text-2xl font-bold text-outline-variant">Conectando por llamada segura</p>
              </div>
              <button 
                onClick={() => setCalling(false)}
                className="w-24 h-24 rounded-full bg-error flex items-center justify-center mt-12 active:scale-90 transition-transform shadow-2xl"
              >
                <Phone className="w-10 h-10 text-white rotate-[135deg]" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
