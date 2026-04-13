import React from 'react';
import { Home, History, HelpCircle, Settings, ArrowLeft, Grid3X3 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Screen } from '../types';
import VoiceAssistant from './VoiceAssistant';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showHelp?: boolean;
  helpLabel?: string;
}

export default function Layout({
  children,
  currentScreen,
  onNavigate,
  title,
  showBack,
  onBack,
  showHelp = true,
  helpLabel = "Ayuda"
}: LayoutProps) {
  const isAuthScreen = currentScreen === 'LOGIN';

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Top App Bar */}
      {!isAuthScreen && (
        <header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md">
          <div className="flex justify-between items-center px-6 py-4 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-4">
              {showBack && (
                <button 
                  onClick={onBack}
                  className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-8 h-8 text-primary" />
                </button>
              )}
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight text-primary truncate max-w-[200px] sm:max-w-none">
                {title || "Mi Banco"}
              </h1>
            </div>
            {showHelp && (
              <button 
                onClick={() => onNavigate('HELP')}
                className="text-lg font-bold text-primary bg-primary-container/10 px-6 py-2 rounded-full hover:bg-primary-container/20 transition-all"
              >
                {helpLabel}
              </button>
            )}
          </div>
          <div className="h-[1px] w-full bg-surface-container-high" />
        </header>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-grow w-full max-w-2xl mx-auto px-4 sm:px-6 pb-36 sm:pb-40 rounded-b-[3rem]",
        isAuthScreen ? "pt-0" : "pt-4 sm:pt-8"
      )}>
        {children}
      </main>

      <VoiceAssistant currentScreen={currentScreen} />

      {/* Bottom Navigation */}
      {!isAuthScreen && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.06)] border-t border-outline-variant/30">
          <div className="flex justify-around items-center w-full max-w-2xl mx-auto px-2 py-3">
            <NavItem 
              icon={<Home className="w-7 h-7" />} 
              label="Inicio" 
              active={currentScreen === 'HOME'} 
              onClick={() => onNavigate('HOME')} 
            />
            <NavItem 
              icon={<History className="w-7 h-7" />} 
              label="Movimientos" 
              active={currentScreen === 'MOVEMENTS'} 
              onClick={() => onNavigate('MOVEMENTS')} 
            />
            <NavItem 
              icon={<Grid3X3 className="w-7 h-7" />} 
              label="Servicios" 
              active={currentScreen === 'SERVICES'} 
              onClick={() => onNavigate('SERVICES')} 
            />
            <NavItem 
              icon={<HelpCircle className="w-7 h-7" />} 
              label="Ayuda" 
              active={currentScreen === 'HELP'} 
              onClick={() => onNavigate('HELP')} 
            />
            <NavItem 
              icon={<Settings className="w-7 h-7" />} 
              label="Ajustes" 
              active={currentScreen === 'SETTINGS'} 
              onClick={() => onNavigate('SETTINGS')} 
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all active:scale-95",
        active ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container-low"
      )}
    >
      <div className={cn("mb-1", active && "[&>svg]:fill-current")}>
        {icon}
      </div>
      <span className={cn("text-[0.65rem] sm:text-sm", active ? "font-bold" : "font-semibold")}>
        {label}
      </span>
    </button>
  );
}
