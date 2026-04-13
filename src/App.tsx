/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Screen } from './types';
import Layout from './components/Layout';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import MovementsScreen from './components/screens/MovementsScreen';
import SendMoneyFlow from './components/screens/SendMoneyFlow';
import PayBillFlow from './components/screens/PayBillFlow';
import HelpScreen from './components/screens/HelpScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import RechargeFlow from './components/screens/RechargeFlow';
import WithdrawFlow from './components/screens/WithdrawFlow';
import ServicesScreen from './components/screens/ServicesScreen';
import { LoansScreen, InsuranceScreen, CertsScreen, InvestScreen } from './components/screens/ServicesFlows';
import GlobalPopup, { PopupConfig } from './components/GlobalPopup';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('app-font-size');
    if (savedFontSize) {
      const newSize = 13 + parseInt(savedFontSize, 10);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  }, []);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN':
        return <LoginScreen onLogin={() => handleNavigate('HOME')} />;
      case 'HOME':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'MOVEMENTS':
        return <MovementsScreen />;
      case 'SEND_STEP_1':
      case 'SEND_STEP_2':
      case 'SEND_STEP_3':
        return (
          <SendMoneyFlow 
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onComplete={(amount, name) => {
              setPopup({
                type: 'success',
                title: 'Transacción exitosa',
                message: `Usted acaba de enviar $${amount} COP a ${name}.`
              });
              handleNavigate('HOME');
            }} 
            onCancel={() => handleNavigate('HOME')} 
            onSimulateSystemError={() => setPopup({
               type: 'system_error',
               title: 'Servicio no disponible',
               message: 'El banco está realizando mantenimiento interno al sistema de transferencias.',
               resolutionTime: 'El servicio estará solucionado en aproximadamente 30 minutos.'
            })}
            onSimulateUserError={() => setPopup({
               type: 'user_error',
               title: 'Acción no permitida',
               message: 'No es posible hacer el envío. Por favor, asegúrese de tener dinero suficiente en su cuenta y vuelva a intentarlo.'
            })}
          />
        );
      case 'PAY_STEP_1':
      case 'PAY_STEP_2':
        return (
          <PayBillFlow 
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onComplete={(amount, company) => {
              setPopup({
                type: 'success',
                title: 'Pago Realizado',
                message: `Se ha pagado exitosamente un total de $${amount} COP a ${company}.`
              });
              handleNavigate('HOME');
            }} 
            onCancel={() => handleNavigate('HOME')} 
            onSimulateSystemError={() => setPopup({
               type: 'system_error',
               title: 'Error de Conexión',
               message: 'No pudimos conectar con los servicios de recaudo en este momento.',
               resolutionTime: 'Por favor intente de nuevo en unos minutos.'
            })}
            onSimulateUserError={() => setPopup({
               type: 'user_error',
               title: 'Saldo Insuficiente',
               message: 'No cuenta con el dinero necesario para realizar el pago de esta factura.'
            })}
          />
        );
      case 'RECHARGE_STEP_1':
      case 'RECHARGE_STEP_2':
        return (
          <RechargeFlow 
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onComplete={(amount, operator) => {
              setPopup({
                type: 'success',
                title: 'Recarga Exitosa',
                message: `Se ha recargado $${amount} COP a su línea ${operator}.`
              });
              handleNavigate('HOME');
            }}
            onCancel={() => handleNavigate('HOME')}
          />
        );
      case 'WITHDRAW_STEP_1':
      case 'WITHDRAW_STEP_2':
        return (
          <WithdrawFlow 
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onComplete={() => {
              setPopup({
                type: 'success',
                title: 'Retiro Autorizado',
                message: `El código ha sido generado correctamente. Ya puede retirar en cualquier cajero del banco.`
              });
              handleNavigate('HOME');
            }}
            onCancel={() => handleNavigate('HOME')}
          />
        );
      case 'HELP':
        return <HelpScreen />;
      case 'SERVICES':
        return <ServicesScreen onNavigate={handleNavigate} />;
      case 'LOANS_SCREEN':
        return <LoansScreen onNavigate={handleNavigate} />;
      case 'INSURANCE_SCREEN':
        return <InsuranceScreen onNavigate={handleNavigate} />;
      case 'CERTS_SCREEN':
        return <CertsScreen />;
      case 'INVEST_SCREEN':
        return <InvestScreen />;
      case 'SETTINGS':
        return <SettingsScreen onLogout={() => handleNavigate('LOGIN')} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  const getTitle = () => {
    switch (currentScreen) {
      case 'HOME': return 'Mi Banco';
      case 'MOVEMENTS': return 'Mis Movimientos';
      case 'SEND_STEP_1':
      case 'SEND_STEP_2':
      case 'SEND_STEP_3': return 'Enviar dinero';
      case 'PAY_STEP_1':
      case 'PAY_STEP_2': return 'Pagar Recibos';
      case 'RECHARGE_STEP_1':
      case 'RECHARGE_STEP_2': return 'Recargar Celular';
      case 'WITHDRAW_STEP_1':
      case 'WITHDRAW_STEP_2': return 'Retirar Cajero';
      case 'HELP': return 'Centro de Ayuda';
      case 'SERVICES': return 'Servicios Bancarios';
      case 'LOANS_SCREEN': return 'Mis Préstamos';
      case 'INSURANCE_SCREEN': return 'Mis Seguros';
      case 'CERTS_SCREEN': return 'Certificados';
      case 'INVEST_SCREEN': return 'Mis Inversiones';
      case 'SETTINGS': return 'Ajustes de la aplicación';
      default: return 'Mi Banco';
    }
  };

  const showBack = ['MOVEMENTS', 'SEND_STEP_1', 'PAY_STEP_1', 'HELP', 'SETTINGS', 'RECHARGE_STEP_1', 'WITHDRAW_STEP_1', 'SERVICES', 'LOANS_SCREEN', 'INSURANCE_SCREEN', 'CERTS_SCREEN', 'INVEST_SCREEN'].includes(currentScreen);

  const getBaseScreenKey = (screen: string) => {
    if (screen.startsWith('SEND_STEP')) return 'SEND_FLOW';
    if (screen.startsWith('PAY_STEP')) return 'PAY_FLOW';
    if (screen.startsWith('RECHARGE_STEP')) return 'RECHARGE_FLOW';
    if (screen.startsWith('WITHDRAW_STEP')) return 'WITHDRAW_FLOW';
    return screen;
  };

  return (
    <Layout 
      currentScreen={currentScreen} 
      onNavigate={handleNavigate}
      title={getTitle()}
      showBack={showBack}
      onBack={() => handleNavigate('HOME')}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={getBaseScreenKey(currentScreen)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <GlobalPopup config={popup} onClose={() => setPopup(null)} />
    </Layout>
  );
}
