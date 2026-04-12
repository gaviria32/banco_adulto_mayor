import React, { useState } from 'react';
import { TrendingUp, UserSearch, ListTodo, FileText, History, Wallet, User as UserIcon, ChevronRight, Zap, BellRing, HelpCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_TRANSACTIONS } from '../../types';

interface HomeScreenProps {
  onNavigate: (screen: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const isMinimalMode = localStorage.getItem('minimal_mode') === 'true';
  const showPaymentReminders = localStorage.getItem('payment_reminders') !== 'false';
  const showSecurityAlerts = localStorage.getItem('security_alerts') !== 'false';

  const [showReminder, setShowReminder] = useState(true);

  return (
    <div className="space-y-12">
      {/* Security Status - Controlled by Security Alerts setting */}
      {showSecurityAlerts && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100/50 border border-green-200 p-4 rounded-2xl flex items-center gap-3 text-green-800"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-bold text-sm md:text-base">Conexión Segura: Su dinero y datos están protegidos</span>
        </motion.div>
      )}

      {/* Smart Reminder / Notifications system */}
      <AnimatePresence>
        {showReminder && showPaymentReminders && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, scale: 0.9, height: 0 }}
            className="bg-secondary-container/40 border-2 border-secondary/30 p-6 rounded-[2rem] flex flex-col gap-4 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 text-secondary font-black text-xl md:text-2xl">
              <BellRing className="w-8 h-8 fill-secondary text-secondary animate-bounce" />
              Aviso importante de pago
            </div>
            <p className="text-on-surface text-[1.25rem] font-medium leading-snug">
              Tiene un recibo de <strong className="font-extrabold text-secondary">Luz (Servicios Públicos)</strong> por valor de $45.000 próximo a vencer <span className="font-bold underline">(vence mañana)</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button 
                onClick={() => onNavigate('PAY_STEP_1')}
                className="w-full bg-secondary text-white font-bold text-xl py-4 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md"
              >
                Pagar ahora
                <ChevronRight className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setShowReminder(false)}
                className="w-full bg-transparent border-2 border-secondary/50 text-secondary hover:bg-secondary/10 font-bold text-xl py-4 rounded-xl active:scale-95 transition-colors"
               >
                Recordarme luego
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Balance Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-container-lowest rounded-[2rem] p-10 flex flex-col gap-4 text-center shadow-sm"
      >
        <h2 className="text-on-surface-variant text-xl md:text-2xl font-medium tracking-tight">Su saldo es:</h2>
        <div className="text-primary text-[3.5rem] md:text-[4.5rem] font-black leading-none tracking-tighter">
          $1.250.000
        </div>
        <div className="mt-4 inline-flex items-center justify-center gap-2 text-secondary font-bold text-lg">
          <TrendingUp className="w-6 h-6" />
          <span>Cuenta de ahorros activa</span>
        </div>
      </motion.section>

      {/* Last 6 Used Functions Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-on-surface">Sus funciones más usadas</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <RecentFunctionCard 
            icon={<UserSearch className="w-10 h-10" />} 
            title="Enviar dinero" 
            onClick={() => onNavigate('SEND_STEP_1')} 
            fullWidth={isMinimalMode}
          />
          <RecentFunctionCard 
            icon={<FileText className="w-10 h-10" />} 
            title="Pagar recibos" 
            onClick={() => onNavigate('PAY_STEP_1')} 
            fullWidth={isMinimalMode}
          />
          <RecentFunctionCard 
            icon={<ListTodo className="w-10 h-10" />} 
            title="Ver mis movimientos" 
            onClick={() => onNavigate('MOVEMENTS')} 
            fullWidth={isMinimalMode}
          />
          {!isMinimalMode && (
            <>
              <RecentFunctionCard 
                icon={<Zap className="w-10 h-10" />} 
                title="Recargar mi celular" 
                onClick={() => onNavigate('RECHARGE_STEP_1')} 
              />
              <RecentFunctionCard 
                icon={<Wallet className="w-10 h-10" />} 
                title="Retirar en cajero" 
                onClick={() => onNavigate('WITHDRAW_STEP_1')} 
              />
              <RecentFunctionCard 
                icon={<PhoneCall className="w-10 h-10" />} 
                title="Contactar al banco" 
                onClick={() => onNavigate('HELP')} 
              />
            </>
          )}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-surface-container-low rounded-[2.5rem] p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-on-surface">Lo que hizo recientemente</h3>
          <History className="text-primary w-8 h-8" />
        </div>
        <div className="flex flex-col gap-4">
          {MOCK_TRANSACTIONS.slice(0, 3).map((tx) => (
            <div key={tx.id} className="bg-surface-container-lowest p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 text-secondary p-3 rounded-full">
                  {tx.type === 'INCOME' ? <Wallet className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-xl font-bold text-on-surface">{tx.title}</p>
                  <p className="text-on-surface-variant text-sm">{tx.date}, {tx.time}</p>
                </div>
              </div>
              <span className={`text-xl font-bold ${tx.amount < 0 ? 'text-error' : 'text-secondary'}`}>
                {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Image */}
      <div className="rounded-[2rem] overflow-hidden relative h-64 group">
        <img 
          src="https://picsum.photos/seed/finance/800/400" 
          alt="Gestión financiera segura" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
          <p className="text-white text-2xl font-bold max-w-xs">Su dinero está seguro con nosotros.</p>
        </div>
      </div>
    </div>
  );
}

function RecentFunctionCard({ 
  icon, 
  title, 
  fullWidth = false,
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  fullWidth?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] text-center transition-all h-[180px] shadow-md border-[3px] ${
        fullWidth ? 'col-span-2 sm:col-span-1' : ''
      } bg-white border-outline-variant/20 hover:border-primary/40 text-on-surface`}
    >
      <div className="mb-4 text-primary bg-primary/5 p-4 rounded-2xl">
        {icon}
      </div>
      <span className="text-[1.25rem] font-black leading-tight px-2">{title}</span>
    </motion.button>
  );
}
