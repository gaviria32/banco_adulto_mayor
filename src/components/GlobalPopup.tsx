import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export type PopupConfig = {
  type: 'success' | 'user_error' | 'system_error';
  title: string;
  message: string;
  resolutionTime?: string;
};

interface GlobalPopupProps {
  config: PopupConfig | null;
  onClose: () => void;
}

export default function GlobalPopup({ config, onClose }: GlobalPopupProps) {
  return (
    <AnimatePresence>
      {config && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-surface-container-lowest rounded-[2rem] p-8 w-full max-w-[420px] z-10 shadow-2xl space-y-6 flex flex-col items-center text-center"
          >
            {config.type === 'success' && <CheckCircle2 className="w-24 h-24 text-secondary drop-shadow-md" />}
            {config.type === 'user_error' && <AlertTriangle className="w-24 h-24 text-warning" style={{color: '#d97706'}} />}
            {config.type === 'system_error' && <XCircle className="w-24 h-24 text-error drop-shadow-md" />}

            <h2 className={`text-[1.75rem] leading-tight font-black ${config.type === 'success' ? 'text-secondary' : 'text-error'}`}>
              {config.title}
            </h2>
            <p className="text-[1.125rem] text-on-surface font-medium leading-normal">
              {config.message}
            </p>
            
            {config.type === 'system_error' && config.resolutionTime && (
              <div className="bg-error-container text-error rounded-xl p-5 w-full border border-error/20">
                <p className="font-bold text-lg mb-1">Información técnica:</p>
                <p className="text-base">{config.resolutionTime}</p>
              </div>
            )}

            <button 
              onClick={onClose}
              className={`w-full h-[64px] rounded-2xl font-bold text-xl active:scale-95 transition-transform ${
                config.type === 'success' ? 'bg-secondary text-white' : 'bg-error text-white'
              }`}
            >
              Entendido
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
