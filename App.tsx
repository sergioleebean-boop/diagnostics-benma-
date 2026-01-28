import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LiveData from './components/LiveData';
import DiagnosticResults from './components/DiagnosticResults';
import ReportPreview from './components/ReportPreview';
import ActuatorTest from './components/ActuatorTest';
import AIInsight from './components/AIInsight';
import VehicleHealth from './components/VehicleHealth';
import { translations, LanguageCode, TranslationKey } from './src/i18n/translations';

enum View {
  HOME = 'HOME',
  LIVE = 'LIVE',
  DIAGNOSTIC = 'DIAGNOSTIC',
  REPORTS = 'REPORTS',
  ACTUATOR_TEST = 'ACTUATOR_TEST',
  AI_INSIGHT = 'AI_INSIGHT',
  VEHICLE_HEALTH = 'VEHICLE_HEALTH',
  SETUP = 'SETUP'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('EN');

  // 翻译函数
  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || translations['EN'][key] || key;
  };

  const languages = [
    { code: 'EN' as LanguageCode, name: 'English', flag: '🇺🇸' },
    { code: 'CN' as LanguageCode, name: '中文', flag: '🇨🇳' },
    { code: 'ES' as LanguageCode, name: 'Español', flag: '🇪🇸' },
    { code: 'FR' as LanguageCode, name: 'Français', flag: '🇫🇷' },
    { code: 'DE' as LanguageCode, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'JP' as LanguageCode, name: '日本語', flag: '🇯🇵' },
    { code: 'KR' as LanguageCode, name: '한국어', flag: '🇰🇷' },
    { code: 'RU' as LanguageCode, name: 'Русский', flag: '🇷🇺' },
    { code: 'PT' as LanguageCode, name: 'Português', flag: '🇧🇷' },
    { code: 'IT' as LanguageCode, name: 'Italiano', flag: '🇮🇹' },
    { code: 'AR' as LanguageCode, name: 'العربية', flag: '🇸🇦' },
    { code: 'TR' as LanguageCode, name: 'Türkçe', flag: '🇹🇷' }
  ];

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Dashboard onNavigate={(view: View) => setCurrentView(view)} t={t} />;
      case View.LIVE:
        return <LiveData onBack={() => setCurrentView(View.HOME)} t={t} />;
      case View.DIAGNOSTIC:
        return <DiagnosticResults onBack={() => setCurrentView(View.HOME)} onReport={() => setCurrentView(View.REPORTS)} t={t} />;
      case View.REPORTS:
        return <ReportPreview onBack={() => setCurrentView(View.DIAGNOSTIC)} t={t} />;
      case View.ACTUATOR_TEST:
        return <ActuatorTest onBack={() => setCurrentView(View.HOME)} t={t} />;
      case View.AI_INSIGHT:
        return <AIInsight onBack={() => setCurrentView(View.HOME)} t={t} />;
      case View.VEHICLE_HEALTH:
        return <VehicleHealth onBack={() => setCurrentView(View.HOME)} t={t} />;
      default:
        return <Dashboard onNavigate={(view: View) => setCurrentView(view)} t={t} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-xl mx-auto bg-background-dark text-slate-100 shadow-2xl relative">
      <button
        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-slate-800/80 backdrop-blur-md border border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
      >
        <span className="material-symbols-outlined text-primary">language</span>
        <span className="text-sm font-bold">{currentLanguage}</span>
      </button>

      {showLanguageMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowLanguageMenu(false)}
          ></div>
          
          <div className="fixed top-16 right-4 z-50 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 max-h-96 overflow-y-auto w-72">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Select Language</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setShowLanguageMenu(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-lg transition ${
                    currentLanguage === lang.code
                      ? 'bg-primary/20 border border-primary text-primary'
                      : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className="text-xs font-bold">{lang.code}</p>
                    <p className="text-[10px] opacity-70">{lang.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex-1 overflow-y-auto pb-24">
        {renderView()}
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl bg-background-dark/95 backdrop-blur-xl border-t border-slate-800 px-6 py-3 pb-8 flex justify-between items-center z-50">
        <NavItem 
          icon="home" 
          label={t('home')}
          active={currentView === View.HOME} 
          onClick={() => setCurrentView(View.HOME)} 
        />
        <NavItem 
          icon="query_stats" 
          label={t('live')}
          active={currentView === View.LIVE} 
          onClick={() => setCurrentView(View.LIVE)} 
        />
        <NavItem 
          icon="qr_code_scanner" 
          label={t('scans')}
          active={currentView === View.DIAGNOSTIC} 
          onClick={() => setCurrentView(View.DIAGNOSTIC)} 
        />
        <NavItem 
          icon="description" 
          label={t('reports')}
          active={currentView === View.REPORTS} 
          onClick={() => setCurrentView(View.REPORTS)} 
        />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <span className={`material-symbols-outlined text-2xl ${active ? 'fill-current' : ''}`}>{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

export default App;
export { View };
