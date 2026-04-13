import React, { useState } from 'react';
import { Flashlight, Camera, Keyboard, Lightbulb, Edit, Bolt, Check, Contact as ContactIcon, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Screen } from '../../types';

interface PayBillFlowProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onComplete: (amount: string, company: string) => void;
  onCancel: () => void;
  onSimulateSystemError: () => void;
  onSimulateUserError: () => void;
}

export default function PayBillFlow({ 
  currentScreen, 
  onNavigate, 
  onComplete, 
  onCancel,
  onSimulateSystemError,
  onSimulateUserError
}: PayBillFlowProps) {
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
              <span className="text-secondary font-bold text-sm sm:text-[1rem] uppercase tracking-widest text-center block sm:text-left">Paso 1 de 2</span>
              <h2 className="text-2xl sm:text-4xl md:text-[2.5rem] font-extrabold leading-tight tracking-tight mt-1 text-center sm:text-left">Escanear factura</h2>
              <p className="text-base sm:text-[1.375rem] text-on-surface-variant max-w-2xl mt-3 sm:mt-4 text-center sm:text-left px-4 sm:px-0">
                Busque el código de barras o el código QR en su recibo impreso.
              </p>
            </div>            <div className="relative w-full aspect-[4/5] sm:aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-[4px] sm:border-[8px] border-surface-container-high group">
              {/* Background Camera Feed (Mock) */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-1000" 
                style={{ backgroundImage: "url('https://picsum.photos/seed/bill/800/1000')" }}
              />
              
              {/* Modern Scanner Mask Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Darkened edges */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                
                {/* Viewing Area (The "Hole") */}
                <div className="relative w-[85%] sm:w-3/4 h-[45%] sm:h-3/5 z-10">
                  {/* Corners */}
                  <div className="absolute -top-1 -left-1 w-12 h-12 border-t-[6px] border-l-[6px] border-secondary rounded-tl-2xl shadow-[0_0_15px_rgba(4,107,94,0.5)]" />
                  <div className="absolute -top-1 -right-1 w-12 h-12 border-t-[6px] border-r-[6px] border-secondary rounded-tr-2xl shadow-[0_0_15px_rgba(4,107,94,0.5)]" />
                  <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-[6px] border-l-[6px] border-secondary rounded-bl-2xl shadow-[0_0_15px_rgba(4,107,94,0.5)]" />
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-[6px] border-r-[6px] border-secondary rounded-br-2xl shadow-[0_0_15px_rgba(4,107,94,0.5)]" />
                  
                  {/* The actual hole (transparent) */}
                  <div className="absolute inset-0 bg-transparent ring-[100vmax] ring-black/50" />
                  
                  {/* Scanning Animated Line */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 h-1 sm:h-1.5 bg-secondary shadow-[0_0_25px_#9defde,0_0_10px_#046b5e] z-20" 
                  />
                  
                  {/* Instruction text inside viewport */}
                  <div className="absolute -bottom-16 inset-x-0 text-center">
                    <p className="text-white text-lg sm:text-2xl font-black drop-shadow-lg animate-pulse">
                      Buscando código...
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Overlay Cues */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest">En Vivo</span>
                </div>
              </div>

              <div className="absolute bottom-6 sm:bottom-10 left-0 w-full flex justify-center gap-6 sm:gap-12 px-6 z-40">
                <button className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white border-2 border-white/20 hover:bg-white/30 transition-all active:scale-90 shadow-2xl">
                  <Flashlight className="w-6 h-6 sm:w-10 sm:h-10" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-secondary flex items-center justify-center text-white shadow-[0_0_30px_rgba(4,107,94,0.6)] hover:scale-105 transition-all active:scale-95 border-4 border-white/30"
                >
                  <Camera className="w-8 h-8 sm:w-12 sm:h-12" />
                </button>
                <button className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white border-2 border-white/20 hover:bg-white/30 transition-all active:scale-90 shadow-2xl">
                  <Keyboard className="w-6 h-6 sm:w-10 sm:h-10" />
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

              <div className="bg-surface-container-low rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center text-center">
                <span className="text-on-surface-variant text-base sm:text-[1.125rem] mb-1 sm:mb-2 font-semibold">Total a pagar</span>
                <span className="text-3xl sm:text-5xl md:text-[4rem] font-extrabold text-primary leading-none tracking-tighter">$ 4.250,00</span>
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
              onClick={() => onComplete('4.250,00', 'Empresa de Energía')}
              className="w-full h-16 sm:h-[96px] bg-gradient-to-r from-primary to-primary-container text-white rounded-xl flex items-center justify-center gap-3 sm:gap-4 active:scale-95 transition-all shadow-xl hover:opacity-90"
            >
              <CreditCard className="w-6 h-6 sm:w-10 sm:h-10 fill-current" />
              <span className="text-xl sm:text-3xl font-extrabold tracking-tight">Pagar ahora</span>
            </button>

            <div className="pt-8 border-t border-outline-variant/30 mt-8 space-y-4">
              <p className="text-error font-bold text-center text-sm uppercase tracking-wide">Área de pruebas (Demo)</p>
              <div className="flex flex-col gap-2">
                <button onClick={onSimulateUserError} className="w-full bg-error/10 text-error rounded-xl py-3 font-bold active:scale-95 transition-transform text-sm hover:bg-error/20">
                  Simular error del usuario (Saldo insuficiente)
                </button>
                <button onClick={onSimulateSystemError} className="w-full bg-error/10 text-error rounded-xl py-3 font-bold active:scale-95 transition-transform text-sm hover:bg-error/20">
                  Simular error del sistema (Servicio caído)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
