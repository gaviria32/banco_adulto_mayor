import React, { useState } from 'react';
import { Flashlight, Camera, Keyboard, Lightbulb, Edit, Bolt, Check, Contact as ContactIcon, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Screen } from '../../types';

interface PayBillFlowProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onComplete: () => void;
  onCancel: () => void;
}

export default function PayBillFlow({ currentScreen, onNavigate, onComplete, onCancel }: PayBillFlowProps) {
  const step = currentScreen === 'PAY_STEP_1' ? 1 : 2;
  const [docNumber, setDocNumber] = useState('');

  const handleNext = () => onNavigate('PAY_STEP_2');

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <span className="text-secondary font-bold text-[1rem] uppercase tracking-widest">Paso 1 de 2</span>
              <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight mt-1">Escanear factura</h2>
              <p className="text-[1.375rem] text-on-surface-variant max-w-2xl mt-4">
                Busque el código de barras o el código QR en su recibo impreso.
              </p>
            </div>

            <div className="relative w-full aspect-[4/5] md:aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-[8px] border-surface-container">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-90" 
                style={{ backgroundImage: "url('https://picsum.photos/seed/bill/800/1000')" }}
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="relative w-3/4 h-2/5 border-[4px] border-white/40 rounded-3xl">
                  <div className="absolute -top-1 -left-1 w-12 h-12 border-t-8 border-l-8 border-secondary rounded-tl-2xl" />
                  <div className="absolute -top-1 -right-1 w-12 h-12 border-t-8 border-r-8 border-secondary rounded-tr-2xl" />
                  <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-8 border-l-8 border-secondary rounded-bl-2xl" />
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-8 border-r-8 border-secondary rounded-br-2xl" />
                  <motion.div 
                    animate={{ top: ['20%', '80%', '20%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[4px] bg-secondary shadow-[0_0_20px_#046b5e] opacity-80" 
                  />
                </div>
                <div className="mt-12 px-8 py-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/20">
                  <p className="text-white text-[1.5rem] font-bold text-center leading-snug">
                    Apunte a la factura o código QR
                  </p>
                </div>
              </div>

              <div className="absolute bottom-10 left-0 w-full flex justify-center gap-8 px-6">
                <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border-2 border-white/30 hover:bg-white/40 transition-all active:scale-90">
                  <Flashlight className="w-10 h-10" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-primary shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
                    <Camera className="w-12 h-12" />
                  </div>
                </button>
                <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border-2 border-white/30 hover:bg-white/40 transition-all active:scale-90">
                  <Keyboard className="w-10 h-10" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] flex items-start gap-6 shadow-sm">
                <div className="bg-primary-fixed p-4 rounded-2xl">
                  <Lightbulb className="text-primary w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-[1.375rem] font-bold text-on-surface mb-2">Buena iluminación</h3>
                  <p className="text-[1.125rem] text-on-surface-variant leading-relaxed">Asegúrese de estar en un lugar bien iluminado para que la cámara lea bien los datos.</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] flex items-start gap-6 shadow-sm">
                <div className="bg-secondary-fixed p-4 rounded-2xl">
                  <Edit className="text-on-secondary-container w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-[1.375rem] font-bold text-on-surface mb-2">¿No funciona?</h3>
                  <p className="text-[1.125rem] text-on-surface-variant leading-relaxed">Si no puede escanear, use el botón de teclado para escribir los números manualmente.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="flex items-start gap-4 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                  <Check className="w-6 h-6" />
                </div>
                <div className="w-1 h-12 bg-secondary opacity-30" />
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl ring-8 ring-primary-container/20">
                  2
                </div>
              </div>
              <div className="flex flex-col gap-12 pt-1">
                <div className="opacity-60">
                  <p className="text-on-surface-variant font-medium">Paso 1</p>
                  <p className="text-xl font-bold">Escaneo de recibo</p>
                </div>
                <div>
                  <p className="text-primary font-bold">Paso 2</p>
                  <p className="text-3xl font-extrabold tracking-tight">Datos del pago</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-lg border border-outline-variant/15">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-primary-container/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Bolt className="text-primary w-12 h-12 fill-current" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight leading-tight">Empresa de Energía</h2>
                    <p className="text-[1.125rem] text-on-surface-variant font-medium">Servicio detectado</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-on-surface-variant text-[1.125rem] font-medium">Vence el</p>
                  <p className="text-2xl font-bold">15 Oct 2023</p>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center">
                <span className="text-on-surface-variant text-[1.125rem] mb-2 font-semibold">Total a pagar</span>
                <span className="text-[4rem] font-extrabold text-primary leading-none tracking-tighter">$ 4.250,00</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-2xl font-bold px-2" htmlFor="doc-number">Número de documento</label>
              <div className="relative">
                <input 
                  className="w-full h-[88px] bg-surface-container-high border-3 border-transparent focus:border-primary focus:ring-0 rounded-xl px-8 text-3xl font-bold transition-all placeholder:text-on-surface-variant/40" 
                  id="doc-number" 
                  placeholder="Ej. 12.345.678" 
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  type="text"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <ContactIcon className="text-on-surface-variant w-10 h-10" />
                </div>
              </div>
              <p className="text-xl text-on-surface-variant px-2 italic">Ingrese el documento del titular del servicio para confirmar.</p>
            </div>

            <button 
              onClick={onComplete}
              className="w-full h-[96px] bg-gradient-to-r from-primary to-primary-container text-white rounded-xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl hover:opacity-90"
            >
              <CreditCard className="w-10 h-10 fill-current" />
              <span className="text-3xl font-extrabold tracking-tight">Pagar ahora</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
