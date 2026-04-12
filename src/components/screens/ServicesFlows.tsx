import React from 'react';
import { 
  Banknote, 
  ShieldCheck, 
  FileCheck, 
  LineChart, 
  ArrowLeft, 
  PhoneCall, 
  Download,
  AlertCircle,
  TrendingUp,
  HeartPulse,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';

// Common sub-component for service details
function ServiceHeader({ title, icon, color }: { title: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <div className={`w-20 h-20 rounded-[1.5rem] ${color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
        {icon}
      </div>
      <h2 className="text-[2.25rem] font-black text-on-surface leading-tight">{title}</h2>
    </div>
  );
}

// 1. LOANS SCREEN
export function LoansScreen({ onNavigate }: { onNavigate: (s: any) => void }) {
  return (
    <div className="space-y-8 pb-10">
      <ServiceHeader title="Mis Préstamos" icon={<Banknote className="w-10 h-10" />} color="bg-purple-600" />
      
      <div className="bg-surface-container-low rounded-[2rem] p-8 space-y-6 border-2 border-outline-variant/20 shadow-sm">
        <div className="space-y-1">
          <p className="text-on-surface-variant font-bold text-lg">Préstamo actual (Libre inversión)</p>
          <p className="text-[2.5rem] font-black text-primary">$4.500.000</p>
        </div>
        <div className="h-[2px] w-full bg-outline-variant/20" />
        <div className="flex justify-between items-center text-xl">
          <span className="font-bold text-on-surface-variant">Próxima cuota:</span>
          <span className="font-black text-on-surface">May 15 - $250.000</span>
        </div>
      </div>

      <div className="bg-purple-50 p-8 rounded-[2rem] border-2 border-purple-200 space-y-4">
        <h3 className="text-2xl font-black text-purple-900">¿Necesita más dinero?</h3>
        <p className="text-lg font-bold text-purple-800 leading-snug">
          Usted tiene un cupo disponible de <strong className="text-[1.5rem] block mt-1">$2.000.000 adicionales</strong> con intereses bajos para pensionados.
        </p>
        <button 
          onClick={() => onNavigate('HELP')}
          className="w-full bg-purple-600 text-white font-black text-xl h-16 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform mt-4"
        >
          <PhoneCall className="w-6 h-6" />
          Pedir información ahora
        </button>
      </div>
    </div>
  );
}

// 2. INSURANCE SCREEN
export function InsuranceScreen({ onNavigate }: { onNavigate: (s: any) => void }) {
  const policies = [
    { name: 'Seguro de Vida Senior', status: 'Activo', icon: <HeartPulse className="w-8 h-8" /> },
    { name: 'Protección Hogar', status: 'Activo', icon: <Home className="w-8 h-8" /> },
  ];

  return (
    <div className="space-y-8 pb-10 text-on-surface">
      <ServiceHeader title="Mis Seguros" icon={<ShieldCheck className="w-10 h-10" />} color="bg-teal-600" />
      
      <p className="text-xl font-bold bg-secondary/10 p-4 rounded-xl text-secondary flex items-center gap-3">
        <ShieldCheck className="w-6 h-6" />
        Usted está protegido por el banco
      </p>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl border-2 border-outline-variant/20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-teal-100 p-3 rounded-full text-teal-600">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-black">Salud Total Senior</p>
              <p className="text-teal-600 font-bold">Cobertura completa activa</p>
            </div>
          </div>
          <AlertCircle className="text-outline-variant w-8 h-8" />
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-outline-variant/20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
               <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-black">Hogar Protegido</p>
              <p className="text-blue-600 font-bold">Asistencia 24 horas</p>
            </div>
          </div>
          <AlertCircle className="text-outline-variant w-8 h-8" />
        </div>
      </div>

      <button 
        onClick={() => onNavigate('HELP')}
        className="w-full h-20 border-4 border-dashed border-teal-300 rounded-[1.5rem] flex items-center justify-center gap-4 text-teal-800 font-black text-xl hover:bg-teal-50 transition-colors"
      >
        Pedir asistencia de emergencia
      </button>
    </div>
  );
}

// 3. CERTIFICATES SCREEN
export function CertsScreen() {
  const docs = [
    { title: 'Certificado de Saldo', desc: 'Para subsidios o trámites' },
    { title: 'Extracto Mensual', desc: 'Ver movimientos del mes' },
    { title: 'Paz y Salvo', desc: 'Certificado de sus deudas' },
  ];

  const handleDownload = (name: string) => {
    alert(`Generando y descargando: ${name}...`);
  };

  return (
    <div className="space-y-8 pb-10">
      <ServiceHeader title="Certificados" icon={<FileCheck className="w-10 h-10" />} color="bg-orange-600" />
      
      <p className="text-[1.25rem] text-on-surface-variant font-medium leading-relaxed">
        Toque el documento que necesita y se guardará automáticamente en su celular.
      </p>

      <div className="space-y-4">
        {docs.map((doc) => (
          <button 
            key={doc.title}
            onClick={() => handleDownload(doc.title)}
            className="w-full bg-surface-container-low p-6 rounded-[2rem] border-2 border-outline-variant/20 hover:border-orange-500 transition-all flex items-center justify-between shadow-sm active:scale-95 group text-left"
          >
            <div>
              <h4 className="text-2xl font-black text-on-surface group-hover:text-orange-600">{doc.title}</h4>
              <p className="text-lg font-bold text-on-surface-variant">{doc.desc}</p>
            </div>
            <Download className="w-10 h-10 text-orange-600" />
          </button>
        ))}
      </div>
    </div>
  );
}

// 4. INVESTMENTS SCREEN
export function InvestScreen() {
  return (
    <div className="space-y-8 pb-10">
      <ServiceHeader title="Inversiones" icon={<LineChart className="w-10 h-10" />} color="bg-indigo-600" />
      
      <div className="bg-indigo-600 text-white rounded-[2.5rem] p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <TrendingUp className="w-32 h-32" />
        </div>
        <div className="space-y-2 relative">
          <p className="text-indigo-100 font-bold text-xl uppercase tracking-widest">Su CDT Ganador</p>
          <p className="text-[3.5rem] font-black leading-none">$10.000.000</p>
        </div>
        <div className="flex items-center gap-3 bg-white/20 p-4 rounded-2xl relative">
          <TrendingUp className="w-8 h-8 text-green-300" />
          <span className="text-xl font-bold">Intereses ganados este mes: <strong className="text-2xl">$120.000</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="p-6 bg-surface-container-high rounded-2xl flex items-center justify-between border-2 border-indigo-200">
           <div>
             <p className="text-on-surface-variant font-black">Vencimiento</p>
             <p className="text-2xl font-black text-indigo-900">En 45 días</p>
           </div>
           <div className="text-right">
             <p className="text-on-surface-variant font-black">Tasa (E.A)</p>
             <p className="text-2xl font-black text-indigo-900">12.5%</p>
           </div>
        </div>
      </div>

      <p className="text-center text-on-surface-variant font-bold text-lg px-4 italic leading-tight">
        "Invertir sus ahorros le permite tener una vejez más tranquila y segura."
      </p>
    </div>
  );
}
