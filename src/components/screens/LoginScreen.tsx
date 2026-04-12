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
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-8">
        <span className="text-2xl font-bold text-primary">Mi Banco</span>
        <button className="text-xl font-bold text-primary bg-primary-container/10 px-6 py-2 rounded-full">
          Ayuda
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-[3.5rem] font-black leading-tight tracking-tight text-on-surface mb-4">
          Hola, bienvenido
        </h1>
        <p className="text-[1.375rem] text-on-surface-variant font-medium">
          Acceda a sus cuentas de forma segura
        </p>
      </motion.div>

      {failedAttempts < 3 ? (
        <>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onLogin} // Real login success demo
            className="w-full aspect-square max-w-[400px] flex flex-col items-center justify-center rounded-[3rem] bg-surface-container-lowest shadow-[0_-12px_40px_rgba(27,28,28,0.06)] p-8 border border-outline-variant/15 group relative"
          >
            <div className={`relative mb-8 flex gap-4 items-center justify-center transition-opacity ${isScanning ? 'opacity-50' : 'opacity-100'}`}>
              <Fingerprint className="w-[100px] h-[100px] text-primary" />
              <ScanFace className="w-[100px] h-[100px] text-primary" />
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-150 -z-10 blur-xl" />
            </div>
            <p className="text-[1.375rem] font-bold text-primary px-4 leading-snug">
              {isScanning ? 'Escaneando...' : 'Toque aquí para entrar con su huella o rostro (Login Exitoso)'}
            </p>
          </motion.button>
          
          {/* Opciones ocultas para demostrar la funcionalidad de fallo dictada por la regla */}
          <div className="mt-6 flex flex-col items-center gap-2">
            {errorMessage && (
              <p className="text-error font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errorMessage}
              </p>
            )}
            <button 
              onClick={simulateBiometricFailure}
              className="mt-4 px-6 py-3 bg-error/10 text-error font-bold rounded-full text-base transition-colors hover:bg-error/20"
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
            <AlertCircle className="w-12 h-12" />
            <p className="font-bold text-lg leading-tight">Demasiados intentos fallidos por huella o rostro.</p>
            <p className="text-base text-error/80">Por favor, utilice su clave numérica.</p>
          </div>
          
          <button onClick={onLogin} className="w-full min-h-[72px] bg-primary text-white border-2 border-primary rounded-2xl flex items-center justify-center gap-4 hover:bg-primary/90 transition-colors group shadow-lg">
            <LayoutGrid className="w-8 h-8" />
            <span className="text-[1.125rem] font-bold">Ingresar pin numérico</span>
          </button>
        </motion.div>
      )}

      <div className="w-full mt-12 mb-8">
        <p className="text-on-surface-variant text-lg">
          ¿No puede entrar? <span className="text-primary font-bold underline decoration-2 underline-offset-4 cursor-pointer">Recuperar acceso</span>
        </p>
      </div>

      <div className="fixed top-0 right-0 -z-10 opacity-40 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-to-br from-primary-container/10 to-secondary-container/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
}
