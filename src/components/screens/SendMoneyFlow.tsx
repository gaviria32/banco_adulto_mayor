import React, { useState } from 'react';
import { Search, UserPlus, Send, Delete, Check, FileText, Clock, BookUser, ShieldAlert, LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_CONTACTS, Contact, Screen } from '../../types';
import { cn } from '../../lib/utils';

interface SendMoneyFlowProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onComplete: (amount: string, contactName: string) => void;
  onCancel: () => void;
  onSimulateSystemError: () => void;
  onSimulateUserError: () => void;
}

export default function SendMoneyFlow({ 
  currentScreen,
  onNavigate,
  onComplete, 
  onCancel, 
  onSimulateSystemError, 
  onSimulateUserError 
}: SendMoneyFlowProps) {
  // Map currentScreen to internal step number
  const step = currentScreen === 'SEND_STEP_1' ? 1 : currentScreen === 'SEND_STEP_2' ? 2 : 3;
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState('');
  
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [hasContactsPermission, setHasContactsPermission] = useState(false);
  const [waitingApproval, setWaitingApproval] = useState(false);

  const handleSendMoneyAction = () => {
    const isFamilyMode = localStorage.getItem('family_mode') === 'true';
    if (isFamilyMode) {
      setWaitingApproval(true);
    } else {
      onComplete(amount, selectedContact?.name || '');
    }
  };

  const handleNext = () => {
    if (step === 1) onNavigate('SEND_STEP_2');
    else if (step === 2) onNavigate('SEND_STEP_3');
  };

  const handleBack = () => {
    if (step === 1) onCancel();
    else if (step === 2) onNavigate('SEND_STEP_1');
    else if (step === 3) onNavigate('SEND_STEP_2');
  };

  const handleNumberClick = (num: string) => {
    setAmount(prev => {
      if (prev === '0' && num !== '.') return num;
      if (num === '.' && prev.includes('.')) return prev;
      return prev + num;
    });
  };

  const handleBackspace = () => {
    setAmount(prev => {
      if (prev.length === 1) return '0';
      return prev.slice(0, -1);
    });
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
            <div className="text-center mb-12">
              <h2 className="text-[2.5rem] font-bold leading-tight tracking-tight text-on-surface mb-4">Paso 1: ¿A quién le envía?</h2>
              <p className="text-on-surface-variant text-[1.125rem]">Busque un contacto o seleccione uno de sus frecuentes.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-outline w-7 h-7" />
              <input 
                className="w-full h-[72px] pl-16 pr-6 bg-surface-container-high border-none rounded-xl text-[1.375rem] font-medium focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-outline" 
                placeholder="Nombre, CBU o CVU" 
                type="text"
              />
            </div>

            <section>
              <h3 className="text-[1.5rem] font-bold text-on-surface mb-8">Contactos frecuentes</h3>
              <div className="grid grid-cols-2 gap-6">
                {MOCK_CONTACTS.map((contact) => (
                  <button 
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact);
                      handleNext();
                    }}
                    className="flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-[2rem] shadow-[0_12px_40px_rgba(27,28,28,0.06)] active:scale-95 transition-all group border-2 border-transparent hover:border-primary/20"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-primary-fixed">
                      <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[1.375rem] font-bold text-on-surface group-hover:text-primary">{contact.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="pt-4">
              {!hasContactsPermission ? (
                <button 
                  onClick={() => setShowPermissionModal(true)}
                  className="w-full min-h-[80px] bg-secondary-container/30 text-secondary border-2 border-secondary/20 hover:border-secondary transition-all rounded-[1.5rem] flex items-center justify-center gap-4 active:scale-95 p-4 shadow-sm"
                >
                  <BookUser className="w-8 h-8 shrink-0" />
                  <span className="text-[1.25rem] font-bold text-left leading-tight">Sincronizar contactos de mi teléfono celular</span>
                </button>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-[1.5rem] font-bold text-on-surface flex items-center gap-3">
                    <BookUser className="w-6 h-6 text-primary" />
                    Mis contactos del celular
                  </h3>
                  <div className="flex flex-col gap-4">
                    {['Hijo Mayor', 'María Pérez (Vecina)', 'Doctor Gómez', 'Doña Blanca (Tienda)'].map((name, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setSelectedContact({ id: `imported-${i}`, name, image: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`, account: '0000-0000', type: 'OTHER' });
                          handleNext();
                        }}
                        className="w-full bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-5 shadow-sm active:scale-[0.98] transition-all border border-outline-variant/15 hover:border-primary/30"
                      >
                         <div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-2xl">
                           {name[0]}
                         </div>
                         <div className="flex flex-col items-start gap-1">
                           <span className="text-xl font-bold text-on-surface leading-tight text-left">{name}</span>
                           <span className="text-sm font-medium text-on-surface-variant">Celular personal</span>
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <p className="text-secondary font-bold text-[1rem] uppercase tracking-widest mb-2">Paso 2 de 3</p>
              <h2 className="font-bold text-[2rem] leading-tight text-on-surface">¿Cuánto desea enviar?</h2>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 flex items-center gap-4 shadow-sm border border-outline-variant/15">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center">
                <img src={selectedContact?.image} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-on-surface-variant text-[1rem]">Enviando a:</p>
                <p className="text-on-surface font-bold text-[1.375rem]">{selectedContact?.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center mb-10">
              <div className="text-center mb-4">
                <span className="text-primary font-bold text-[2rem] mr-2">$</span>
                <span className="text-on-surface font-extrabold text-[3.5rem] tracking-tighter">{amount}</span>
                <span className="text-on-surface-variant font-bold text-[1.375rem] ml-2">COP</span>
              </div>
              <div className="w-full h-1 bg-primary-container/20 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-primary rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((num) => (
                <button 
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="h-20 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-xl flex items-center justify-center text-[2rem] font-bold text-on-surface active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button 
                onClick={handleBackspace}
                className="h-20 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-xl flex items-center justify-center text-primary active:scale-95"
              >
                <Delete className="w-10 h-10" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-on-surface font-bold text-[1.375rem]">Mensaje (opcional)</label>
              <div className="bg-surface-container-high rounded-xl p-4 focus-within:ring-3 focus-within:ring-primary transition-all">
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 text-[1.375rem] text-on-surface placeholder:text-on-surface-variant/50" 
                  placeholder="Ej: Regalo de cumpleaños" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="w-full min-h-[72px] bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold text-[1.375rem] shadow-xl hover:opacity-90 active:scale-95 transition-all"
            >
              Continuar al paso final
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div>
              <h1 className="text-[2rem] font-bold text-on-surface mb-2">Paso 3 de 3: Confirmar envío</h1>
              <div className="flex gap-2">
                <div className="h-2 w-12 rounded-full bg-primary" />
                <div className="h-2 w-12 rounded-full bg-primary" />
                <div className="h-2 w-24 rounded-full bg-primary" />
              </div>
            </div>

            <div className="w-full bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-lg border border-outline-variant/15">
              <div className="text-center mb-12">
                <p className="text-on-surface-variant text-lg font-medium mb-2">Monto a enviar</p>
                <h2 className="text-[3.5rem] font-black text-primary leading-tight tracking-tight">${amount} COP</h2>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-primary-fixed shrink-0">
                    <img src={selectedContact?.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-base font-medium">Destinatario</p>
                    <p className="text-[1.375rem] font-bold text-on-surface">{selectedContact?.name}</p>
                    <p className="text-on-surface-variant">Cuenta Dignity Bank {selectedContact?.account}</p>
                  </div>
                </div>

                <div className="h-px bg-surface-container-high w-full" />

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-base font-medium">Mensaje opcional</p>
                    <p className="text-[1.125rem] font-medium text-on-surface italic mt-1 leading-relaxed">
                      "{message || "Sin mensaje"}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-base font-medium">Fecha de envío</p>
                    <p className="text-[1.125rem] font-bold text-on-surface">Inmediato (Hoy, 11 Abril)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              <button 
                onClick={handleSendMoneyAction}
                className="w-full h-[72px] bg-gradient-to-r from-primary to-primary-container text-white rounded-[1.5rem] text-[1.375rem] font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg"
              >
                <span>Enviar dinero ahora</span>
                <Send className="w-6 h-6" />
              </button>
              <button 
                onClick={onCancel}
                className="w-full h-[60px] bg-transparent text-primary rounded-[1.5rem] text-[1.125rem] font-semibold flex items-center justify-center active:bg-surface-container-low transition-colors"
              >
                Cancelar transacción
              </button>
              
               <div className="pt-8 border-t border-outline-variant/30 mt-8 space-y-4">
                 <p className="text-error font-bold text-center text-sm uppercase tracking-wide">Área de pruebas (Demo)</p>
                 <div className="flex flex-col gap-2">
                   <button onClick={onSimulateUserError} className="w-full bg-error/10 text-error rounded-xl py-3 font-bold active:scale-95 transition-transform text-sm hover:bg-error/20">
                     Simular error del usuario (Falta de saldo)
                   </button>
                   <button onClick={onSimulateSystemError} className="w-full bg-error/10 text-error rounded-xl py-3 font-bold active:scale-95 transition-transform text-sm hover:bg-error/20">
                     Simular caída del banco (Problema interno)
                   </button>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPermissionModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPermissionModal(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-container-lowest rounded-[2rem] p-8 w-full max-w-[400px] z-10 space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
                 <BookUser className="w-10 h-10" />
              </div>
              <h3 className="text-2xl md:text-[1.75rem] font-black text-center text-on-surface leading-tight">
                ¿Permitir el acceso a sus contactos?
              </h3>
              <p className="text-[1.125rem] text-on-surface-variant text-center font-medium leading-snug">
                Esto nos ayudará a mostrarle la lista de sus familiares y amigos directamente aquí, para que pueda enviar dinero tocando sus nombres sin memorizar números de cuenta.
              </p>
              <div className="space-y-3 pt-4">
                <button 
                  onClick={() => {
                    setHasContactsPermission(true);
                    setShowPermissionModal(false);
                  }}
                  className="w-full h-[64px] bg-primary text-white rounded-2xl font-bold text-xl active:scale-95 transition-transform"
                >
                  Sí, permitir
                </button>
                <button 
                  onClick={() => setShowPermissionModal(false)}
                  className="w-full h-[64px] bg-transparent text-primary rounded-2xl font-bold text-xl hover:bg-surface-container active:scale-95 transition-all"
                >
                  No por ahora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {waitingApproval && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center px-6 bg-surface">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-8 w-full max-w-[400px]"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-surface-container flex items-center justify-center relative">
                   <ShieldAlert className="w-16 h-16 text-secondary" />
                </div>
                <LoaderCircle className="absolute inset-0 w-32 h-32 text-secondary animate-spin" strokeWidth={3} />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-black text-on-surface">Esperando aprobación familiar</h2>
                <p className="text-xl text-on-surface-variant font-medium">
                  Le hemos enviado una notificación al celular de su hijo para que autorice este movimiento de dinero por su seguridad.
                </p>
              </div>

              <div className="pt-12 w-full space-y-4">
                 <button 
                   onClick={() => onComplete(amount, selectedContact?.name || '')}
                   className="w-full h-16 bg-secondary/20 text-secondary border-2 border-secondary/30 rounded-2xl font-bold flex items-center justify-center transition-all hover:bg-secondary hover:text-white"
                 >
                   [Demo] Simular aprobación del familiar
                 </button>
                 <button 
                   onClick={() => setWaitingApproval(false)}
                   className="w-full h-16 bg-transparent text-error rounded-2xl font-bold flex items-center justify-center transition-all hover:bg-error/10"
                 >
                   Cancelar transferencia
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
