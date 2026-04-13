import React, { useState } from 'react';
import { Fingerprint, ScanFace, LayoutGrid, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const simulateBiometricFailure = () => {
    setIsScanning(true);
    setErrorMessage('');
    
    // Simulate biometric scan process
    setTimeout(() => {
      setIsScanning(false);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setErrorMessage(`No se pudo reconocer. Intento ${newAttempts} de 3.`);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 sm:p-8 max-w-2xl mx-auto w-full overflow-y-auto">
      {/* Header section (Non-absolute) */}
      <header className="flex justify-between items-center mb-8 sm:mb-12 shrink-0">
        <span className="text-xl sm:text-2xl font-black text-primary tracking-tight">Mi Banco</span>
        <button className="text-base sm:text-xl font-bold text-primary bg-primary-container/15 px-4 sm:px-6 py-2 rounded-full active:scale-95 transition-transform">
          Ayuda
        </button>
      </header>

      {/* Main flow area */}
      <div className="flex-grow flex flex-col items-center justify-around gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-5xl md:text-[3.5rem] font-black leading-tight tracking-tight text-on-surface mb-2 sm:mb-4">
            Hola, bienvenido
          </h1>
          <p className="text-base sm:text-[1.375rem] text-on-surface-variant font-medium">
            Acceda a sus cuentas de forma segura
          </p>
        </motion.div>

        <div className="w-full flex flex-col items-center">
          {failedAttempts < 3 ? (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="w-full aspect-square max-w-[280px] sm:max-w-[400px] flex flex-col items-center justify-center rounded-[2.5rem] sm:rounded-[3rem] bg-surface-container-lowest shadow-xl sm:shadow-2xl p-6 sm:p-8 border border-outline-variant/15 group relative active:bg-surface-container-low transition-colors"
              >
                <div className={`relative mb-4 sm:mb-8 flex gap-3 sm:gap-4 items-center justify-center transition-opacity ${isScanning ? 'opacity-50' : 'opacity-100'}`}>
                  <Fingerprint className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
                  <ScanFace className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
                  <div className="absolute inset-0 bg-primary/5 rounded-full scale-150 -z-10 blur-xl animate-pulse" />
                </div>
                <p className="text-base sm:text-[1.375rem] font-bold text-primary px-2 sm:px-4 leading-snug">
                  {isScanning ? 'Escaneando...' : 'Toque aquí para entrar con su huella o rostro'}
                </p>
              </motion.button>
              
              <div className="mt-6 flex flex-col items-center gap-2">
                {errorMessage && (
                  <p className="text-error text-sm sm:text-base font-bold flex items-center gap-2 bg-error/5 px-4 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    {errorMessage}
                  </p>
                )}
                <button 
                  onClick={simulateBiometricFailure}
                  className="mt-2 text-primary font-bold text-sm sm:text-base underline underline-offset-4 decoration-2 opacity-60 hover:opacity-100 transition-opacity"
                >
                  [Demo] Simular fallo de lectura ({failedAttempts}/3)
                </button>
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[400px] space-y-6"
            >
              <div className="bg-error-container text-error p-6 rounded-2xl mb-8 flex flex-col items-center gap-3">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                <p className="font-bold text-lg leading-tight">Demasiados intentos fallidos.</p>
                <p className="text-base text-error/80">Use su clave numérica.</p>
              </div>
              
              <button onClick={onLogin} className="w-full min-h-[64px] sm:min-h-[72px] bg-primary text-white border-2 border-primary rounded-2xl flex items-center justify-center gap-4 hover:bg-primary/90 transition-colors group shadow-lg active:scale-95">
                <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-lg font-bold">Ingresar pin numérico</span>
              </button>
            </motion.div>
          )}
        </div>

        <div className="text-center mt-4 shrink-0">
          <p className="text-on-surface-variant text-base sm:text-lg">
            ¿No puede entrar? <span className="text-primary font-bold underline decoration-2 underline-offset-4 cursor-pointer">Recuperar acceso</span>
          </p>
        </div>
      </div>

      <div className="fixed top-0 right-0 -z-10 opacity-30 pointer-events-none">
        <div className="w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-primary-container/10 to-secondary-container/10 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
}
