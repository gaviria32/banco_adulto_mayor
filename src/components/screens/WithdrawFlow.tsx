import React, { useState } from 'react';
import { Lock, Fingerprint, ShieldCheck, Info, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../../types';

interface WithdrawFlowProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onComplete: () => void;
  onCancel: () => void;
}

export default function WithdrawFlow({ currentScreen, onNavigate, onComplete, onCancel }: WithdrawFlowProps) {
  const step = currentScreen === 'WITHDRAW_STEP_1' ? 1 : 2;
  const [withdrawCode, setWithdrawCode] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleWithdrawRequest = () => {
    setIsSimulating(true);
    // Simulate biometric check success
    setTimeout(() => {
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setWithdrawCode(randomCode);
      setIsSimulating(false);
      onNavigate('WITHDRAW_STEP_2');
    }, 1500);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Fingerprint className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-[2.5rem] font-bold leading-tight text-on-surface">Retiro sin tarjeta</h2>
              <p className="text-on-surface-variant text-[1.25rem] max-w-md mx-auto">
                Genere un código de seguridad para retirar dinero en cualquier cajero del banco de forma rápida.
              </p>
            </div>

            <div className="bg-surface-container-low p-8 rounded-[2rem] border-2 border-outline-variant/20">
               <ul className="space-y-6">
                 <li className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
                   <p className="text-[1.25rem] font-bold text-on-surface">Oprima el botón azul de abajo</p>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
                   <p className="text-[1.25rem] font-bold text-on-surface">Ponga su huella si la aplicación se lo pide</p>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">3</div>
                   <p className="text-[1.25rem] font-bold text-on-surface">Anote el número que aparecerá en pantalla</p>
                 </li>
               </ul>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleWithdrawRequest}
                disabled={isSimulating}
                className="w-full h-[88px] bg-primary text-white rounded-[2rem] text-2xl font-black shadow-xl active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Lock className="w-8 h-8" />
                    Generar código ahora
                  </>
                )}
              </button>
              <button 
                onClick={onCancel}
                className="w-full h-16 bg-transparent text-primary font-bold text-xl rounded-2xl flex items-center justify-center"
              >
                Cancelar y volver
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="bg-primary/5 border-4 border-primary/20 p-10 rounded-[3rem] flex flex-col items-center text-center space-y-8 shadow-inner">
              <ShieldCheck className="w-20 h-20 text-secondary" />
              <div className="space-y-3">
                <p className="text-on-surface-variant text-2xl font-bold">Su código de retiro es:</p>
                <h3 className="text-[6rem] font-black text-primary tracking-[1rem] tabular-nums leading-none">
                  {withdrawCode}
                </h3>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-3xl border-2 border-secondary/20 shadow-sm">
                <Info className="text-secondary w-8 h-8 shrink-0" />
                <p className="text-left text-on-surface-variant text-lg font-bold leading-snug">
                  Use este número en el cajero. Puede retirar <strong className="text-on-surface">cualquier monto</strong> que tenga disponible.
                </p>
              </div>
            </div>

            <div className="space-y-4">
               <button 
                 onClick={onComplete}
                 className="w-full h-[88px] bg-primary text-white rounded-[2.5rem] text-[1.75rem] font-black shadow-xl"
               >
                 Entendido, ya lo anoté
               </button>
               <button 
                 className="w-full h-[72px] bg-surface-container-high text-on-surface rounded-[2rem] text-xl font-bold flex items-center justify-center gap-3"
               >
                 <Copy className="w-6 h-6" />
                 Copiar código para pegar
               </button>
            </div>

            <p className="text-center text-on-surface-variant font-bold text-xl px-4">
              ⚠️ No entregue este código a personas que le pidan ayuda en el cajero.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
