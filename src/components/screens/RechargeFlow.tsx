import React, { useState } from 'react';
import { Smartphone, ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Screen } from '../../types';

interface RechargeFlowProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onComplete: (amount: string, operator: string) => void;
  onCancel: () => void;
}

const OPERATORS = [
  { id: 'claro', name: 'Claro', color: 'bg-red-600' },
  { id: 'movistar', name: 'Movistar', color: 'bg-blue-500' },
  { id: 'tigo', name: 'Tigo', color: 'bg-blue-900' },
  { id: 'wom', name: 'WOM', color: 'bg-purple-600' },
];

const AMOUNTS = ['5.000', '10.000', '20.000', '50.000', '100.000'];

export default function RechargeFlow({ currentScreen, onNavigate, onComplete, onCancel }: RechargeFlowProps) {
  const step = currentScreen === 'RECHARGE_STEP_1' ? 1 : 2;
  const [selectedOperator, setSelectedOperator] = useState<typeof OPERATORS[0] | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => onNavigate('RECHARGE_STEP_2');
  const handleBack = () => {
    if (step === 1) onCancel();
    else onNavigate('RECHARGE_STEP_1');
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="text-center">
              <h2 className="text-[2.5rem] font-bold leading-tight text-on-surface mb-4">Recarga de Celular</h2>
              <p className="text-on-surface-variant text-[1.25rem]">Seleccione su empresa de telefonía</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {OPERATORS.map((op) => (
                <button 
                  key={op.id}
                  onClick={() => {
                    setSelectedOperator(op);
                    handleNext();
                  }}
                  className="w-full h-[100px] bg-surface-container-lowest rounded-[1.5rem] p-6 flex items-center gap-6 border-2 border-transparent hover:border-primary/30 active:scale-[0.98] transition-all shadow-sm"
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl", op.color)}>
                    {op.name[0]}
                  </div>
                  <span className="text-[1.75rem] font-black text-on-surface">{op.name}</span>
                  <ChevronRight className="ml-auto w-8 h-8 text-outline" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedOperator && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
             <button onClick={handleBack} className="flex items-center gap-2 text-primary font-bold text-xl">
               <ArrowLeft /> Volver atrás
             </button>
             
             <div className="bg-surface-container-high p-8 rounded-[2rem] space-y-4">
               <div className="flex items-center gap-4">
                 <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold", selectedOperator.color)}>
                   {selectedOperator.name[0]}
                 </div>
                 <p className="text-2xl font-black">Recarga {selectedOperator.name}</p>
               </div>
               <div className="space-y-2">
                 <label className="text-lg font-bold text-on-surface-variant">Número de celular</label>
                 <input 
                   type="tel" 
                   placeholder="Ej: 310 123 4567"
                   className="w-full h-16 bg-white border-none rounded-xl text-2xl font-bold px-4 focus:ring-4 focus:ring-primary/20"
                   value={phoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)}
                 />
               </div>
             </div>

             <div className="space-y-6">
               <h3 className="text-2xl font-black text-on-surface">Seleccione el valor</h3>
               <div className="grid grid-cols-2 gap-4">
                 {AMOUNTS.map((amt) => (
                   <button 
                     key={amt}
                     onClick={() => onComplete(amt, selectedOperator.name)}
                     className="h-[100px] bg-white border-2 border-outline-variant/30 rounded-2xl flex items-center justify-center text-[1.75rem] font-black text-primary hover:border-primary active:scale-95 transition-all shadow-sm"
                   >
                     ${amt}
                   </button>
                 ))}
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
