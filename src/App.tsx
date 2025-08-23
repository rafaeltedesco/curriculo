import React, { useState } from 'react';
import { Bot, Key, X, CheckCircle } from 'lucide-react';
import { useCVData } from './hooks/useCVData';
import toast, { Toaster } from 'react-hot-toast';
import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import ExportButton from './components/Preview/ExportButton';
import { setApiKey as setAIApiKey } from './services/aiService';

function App() {
  const cvMethods = useCVData();
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);


  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
  };

  const handleApiKeySubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const trimmedKey = apiKey.trim();
      if (trimmedKey) {
        setAIApiKey(trimmedKey);
        setHasApiKey(true);
        toast.success('API Key configurada! Agora você pode usar as funcionalidades de IA');
      }
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setAIApiKey('');
    setHasApiKey(false);
    toast('API Key removida - Funcionalidades de IA desabilitadas');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bot className="h-8 w-8 text-green-600" />
                Gerador de Currículos AI
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Gerador Inteligente de Currículos com IA
              </p>
            </div>

            {/* Botões do header */}
            <div className="flex items-center gap-3">
              {/* Input de API Key */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    onKeyDown={handleApiKeySubmit}
                    placeholder="Cole sua API Key"
                    className={`
                      pl-10 pr-10 py-2 w-64 text-sm border rounded-lg transition-all duration-200
                      ${
                        hasApiKey
                          ? 'border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 bg-white focus:border-green-500 focus:ring-green-200'
                      }
                      focus:outline-none focus:ring-2
                    `}
                  />
                  {hasApiKey && (
                    <button
                      onClick={handleClearApiKey}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remover API Key"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {hasApiKey && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>IA Ativa</span>
                  </div>
                )}
              </div>

              {/* Botão de exportação */}
              <ExportButton cvData={cvMethods.cvData} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Formulário */}
          <FormSection {...cvMethods} />

          {/* Preview */}
          <PreviewSection cvData={cvMethods.cvData} />
        </div>
      </main>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
