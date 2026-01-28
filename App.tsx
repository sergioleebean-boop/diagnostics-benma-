import React from 'react';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-xl mx-auto bg-background-dark text-slate-100 shadow-2xl relative">
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">GlobalScan Pro</h1>
        <p className="text-center text-slate-400 mb-8">Vehicle Diagnostic System</p>
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-primary text-4xl">qr_code_scanner</span>
        </div>
        <p className="text-center text-slate-500">Testing deployment...</p>
      </div>
    </div>
  );
};

export default App;