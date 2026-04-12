import React from 'react';
import { 
  Zap, 
  Wallet, 
  HeartHandshake, 
  Banknote, 
  ShieldCheck, 
  FileCheck, 
  LineChart, 
  Gift
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesScreenProps {
  onNavigate: (screen: any) => void;
}

export default function ServicesScreen({ onNavigate }: ServicesScreenProps) {
  const services = [
    { 
      id: 'recharge', 
      title: 'Recargar Celular', 
      icon: <Zap className="w-12 h-12" />, 
      color: 'bg-blue-500', 
      onClick: () => onNavigate('RECHARGE_STEP_1') 
    },
    { 
      id: 'withdraw', 
      title: 'Retirar Efectivo', 
      icon: <Wallet className="w-12 h-12" />, 
      color: 'bg-green-600', 
      onClick: () => onNavigate('WITHDRAW_STEP_1') 
    },
    { 
      id: 'support', 
      title: 'Hablar con Asesor', 
      icon: <HeartHandshake className="w-12 h-12" />, 
      color: 'bg-primary', 
      onClick: () => onNavigate('HELP') 
    },
    { 
      id: 'loans', 
      title: 'Mis Préstamos', 
      icon: <Banknote className="w-12 h-12" />, 
      color: 'bg-purple-600', 
      onClick: () => onNavigate('LOANS_SCREEN') 
    },
    { 
      id: 'insurance', 
      title: 'Seguros', 
      icon: <ShieldCheck className="w-12 h-12" />, 
      color: 'bg-teal-600', 
      onClick: () => onNavigate('INSURANCE_SCREEN') 
    },
    { 
      id: 'certs', 
      title: 'Certificados', 
      icon: <FileCheck className="w-12 h-12" />, 
      color: 'bg-orange-600', 
      onClick: () => onNavigate('CERTS_SCREEN') 
    },
    { 
      id: 'invest', 
      title: 'Inversiones', 
      icon: <LineChart className="w-12 h-12" />, 
      color: 'bg-indigo-600', 
      onClick: () => onNavigate('INVEST_SCREEN') 
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-[2.25rem] font-black text-on-surface leading-tight">Servicios y Beneficios</h2>
        <p className="text-[1.25rem] text-on-surface-variant font-medium">Explore todo lo que su banco tiene para usted.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 pb-12">
        {services.map((service, idx) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={service.onClick}
            className="flex flex-col items-center justify-center p-8 bg-surface-container-low rounded-[2.5rem] border-2 border-outline-variant/20 hover:border-primary/40 transition-all shadow-sm group h-[220px]"
          >
            <div className={`w-20 h-20 rounded-full ${service.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <span className="text-xl md:text-2xl font-black text-on-surface group-hover:text-primary transition-colors text-center w-full px-2 leading-tight">
              {service.title}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-[2.5rem] border-2 border-primary/10 text-center space-y-4">
        <p className="text-on-surface-variant font-bold text-lg italic">¿No encuentra lo que busca?</p>
        <button 
          onClick={() => onNavigate('HELP')}
          className="text-primary font-black text-2xl underline decoration-4 underline-offset-8"
        >
          Preguntar a un asesor ahora
        </button>
      </div>
    </div>
  );
}
