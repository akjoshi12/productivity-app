import React from 'react';
import { ModeProvider } from './context/ModeContext';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ModeProvider>
      <AppProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="p-8 max-w-7xl mx-auto">
              <Dashboard />
            </div>
          </main>
        </div>
      </AppProvider>
    </ModeProvider>
  );
}

export default App;