import React, { useState, useEffect } from 'react';
import { Eye, Users, Palette, Bell, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsScreenProps {
  onLogout: () => void;
}

export default function SettingsScreen({ onLogout }: SettingsScreenProps) {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('app-font-size');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [familyMode, setFamilyMode] = useState(() => {
    return localStorage.getItem('family_mode') === 'true';
  });

  const [daltonismMode, setDaltonismMode] = useState(() => {
    return localStorage.getItem('app-daltonism') || 'normal';
  });

  const [minimalMode, setMinimalMode] = useState(() => {
    return localStorage.getItem('minimal_mode') === 'true';
  });

  const [paymentReminders, setPaymentReminders] = useState(() => {
    return localStorage.getItem('payment_reminders') !== 'false'; // Default to true
  });

  const [securityAlerts, setSecurityAlerts] = useState(() => {
    return localStorage.getItem('security_alerts') !== 'false'; // Default to true
  });

  useEffect(() => {
    // 5 -> 18px (base default), 1 -> 14px, 10 -> 23px
    const newSize = 13 + fontSize;
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('app-font-size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.setAttribute('data-daltonism', daltonismMode);
    localStorage.setItem('app-daltonism', daltonismMode);
  }, [daltonismMode]);

  const getFontSizeLabel = (val: number) => {
    if (val <= 3) return 'Pequeño';
    if (val <= 5) return 'Normal';
    if (val <= 7) return 'Grande';
    return 'Muy Grande';
  };

  return (
    <div className="space-y-12">
      {/* Section 1: Accesibilidad Visual */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Eye className="text-primary w-6 h-6 fill-current" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-on-surface-variant">Accesibilidad Visual</h2>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm space-y-8 border border-outline-variant/15">
          <div className="space-y-4">
            <label className="text-lg font-semibold flex justify-between">
              Tamaño de letra
              <span className="text-primary">{getFontSizeLabel(fontSize)}</span>
            </label>
            <input 
              className="w-full h-12 accent-primary" 
              max="10" 
              min="1" 
              step="1" 
              type="range" 
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))} 
            />
            <div className="flex justify-between text-sm font-medium text-outline">
              <span>Pequeño</span>
              <span>Muy Grande</span>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-lg font-semibold">Modo para Daltonismo</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setDaltonismMode('normal')}
                className={`h-[60px] rounded-xl font-bold transition-all ${daltonismMode === 'normal' ? 'border-2 border-primary bg-primary-fixed text-primary' : 'border-2 border-outline-variant hover:border-primary text-on-surface-variant'}`}
              >Desactivado
              </button>
              <button 
                onClick={() => setDaltonismMode('protanopia')}
                className={`h-[60px] rounded-xl font-bold transition-all ${daltonismMode === 'protanopia' ? 'border-2 border-primary bg-primary-fixed text-primary' : 'border-2 border-outline-variant hover:border-primary text-on-surface-variant'}`}
              >Protanopia
              </button>
              <button 
                onClick={() => setDaltonismMode('deuteranopia')}
                className={`h-[60px] rounded-xl font-bold transition-all ${daltonismMode === 'deuteranopia' ? 'border-2 border-primary bg-primary-fixed text-primary' : 'border-2 border-outline-variant hover:border-primary text-on-surface-variant'}`}
              >Deuteranopia
              </button>
              <button 
                onClick={() => setDaltonismMode('tritanopia')}
                className={`h-[60px] rounded-xl font-bold transition-all ${daltonismMode === 'tritanopia' ? 'border-2 border-primary bg-primary-fixed text-primary' : 'border-2 border-outline-variant hover:border-primary text-on-surface-variant'}`}
              >Tritanopia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Seguridad y Familia */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="text-primary w-6 h-6 fill-current" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-on-surface-variant">Seguridad y Familia</h2>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm border border-outline-variant/15">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Modo Familiar</h3>
              <p className="text-lg text-on-surface-variant leading-snug">Pedir permiso a un familiar antes de enviar dinero o pagos altos</p>
            </div>
            <Toggle 
              checked={familyMode} 
              onChange={() => {
                const newVal = !familyMode;
                setFamilyMode(newVal);
                localStorage.setItem('family_mode', String(newVal));
              }} 
            />
          </div>
        </div>
      </section>

      {/* Section 3: Apariencia */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Palette className="text-primary w-6 h-6 fill-current" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-on-surface-variant">Apariencia</h2>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm border border-outline-variant/15">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Modo Minimalista</h3>
              <p className="text-lg text-on-surface-variant leading-snug">Solo ver Pagar, Enviar y Movimientos en el inicio</p>
            </div>
            <Toggle 
              checked={minimalMode} 
              onChange={() => {
                const newVal = !minimalMode;
                setMinimalMode(newVal);
                localStorage.setItem('minimal_mode', String(newVal));
              }} 
            />
          </div>
        </div>
      </section>

      {/* Section 4: Notificaciones */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="text-primary w-6 h-6 fill-current" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-on-surface-variant">Notificaciones</h2>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm space-y-10 border border-outline-variant/15">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Avisos de pago</h3>
            <Toggle 
              checked={paymentReminders} 
              onChange={() => {
                const newVal = !paymentReminders;
                setPaymentReminders(newVal);
                localStorage.setItem('payment_reminders', String(newVal));
              }} 
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Alertas de seguridad</h3>
            <Toggle 
              checked={securityAlerts} 
              onChange={() => {
                const newVal = !securityAlerts;
                setSecurityAlerts(newVal);
                localStorage.setItem('security_alerts', String(newVal));
              }} 
            />
          </div>
        </div>
      </section>

      {/* Section 5: Otros */}
      <section className="pt-8">
        <button 
          onClick={onLogout}
          className="w-full h-[72px] bg-error text-white font-bold text-xl rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg"
        >
          <LogOut className="w-6 h-6" />
          Cerrar Sesión
        </button>
        <p className="text-center text-outline-variant mt-6 text-sm">Versión 4.2.0 - Banco Dignificado</p>
      </section>
    </div>
  );
}

function Toggle({ defaultChecked = false, checked, onChange }: { defaultChecked?: boolean, checked?: boolean, onChange?: () => void }) {
  // Use generic internal state if not controlled
  const [internal, setInternal] = useState(defaultChecked);
  
  const isChecked = checked !== undefined ? checked : internal;
  const handleChange = () => {
    if (onChange) onChange();
    setInternal(!internal);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input checked={isChecked} onChange={handleChange} className="sr-only peer" type="checkbox" />
      <div className="w-16 h-9 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-secondary after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all" />
    </label>
  );
}
