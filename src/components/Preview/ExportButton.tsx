import { useState } from 'react';
import { FileDown, X } from 'lucide-react';
import { CVData } from '../../types/cv.types';
import { PDFOptions } from '../../types/api.types';
import { downloadPDF } from '../../services/pdfService';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  cvData: CVData;
  className?: string;
}

function ExportButton({
  cvData,
  className = '',
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [pdfOptions, setPdfOptions] = useState<PDFOptions>({
    theme: 'modern',
    colorScheme: 'green',
    fontSize: 'medium',
  });

  const handleExport = async () => {
    setIsExporting(true);

    try {
      await downloadPDF(cvData, pdfOptions);
      toast.success('PDF gerado! Seu currículo foi baixado com sucesso');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro na exportação - Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
      setShowOptions(false);
    }
  };

  const hasContent =
    cvData.personalInfo.fullName ||
    cvData.skills.length > 0 ||
    cvData.experiences.length > 0;

  return (
    <div className="relative">
      {/* Botão principal */}
      <button
        onClick={() => setShowOptions(true)}
        disabled={!hasContent || isExporting}
        className={`
          px-6 py-2 bg-green-600 text-white
          rounded-lg hover:bg-green-700
          disabled:bg-gray-400 disabled:cursor-not-allowed
          transition-all duration-200 shadow-lg hover:shadow-xl
          transform hover:scale-105 disabled:hover:scale-100
          flex items-center gap-3 font-medium
          ${className}
        `}
      >
        {isExporting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Gerando PDF...</span>
          </>
        ) : (
          <>
            <FileDown className="h-5 w-5" />
            <span>Exportar PDF</span>
          </>
        )}
      </button>

      {/* Modal de opções */}
      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Opções de Exportação
              </h3>
              <button
                onClick={() => setShowOptions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Tema */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema do Layout
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['modern', 'classic', 'minimal'] as const).map((theme) => (
                    <button
                      key={theme}
                      onClick={() =>
                        setPdfOptions((prev) => ({ ...prev, theme }))
                      }
                      className={`
                        px-3 py-2 text-sm rounded-md border
                        ${
                          pdfOptions.theme === theme
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                    >
                      {theme === 'modern'
                        ? 'Moderno'
                        : theme === 'classic'
                        ? 'Clássico'
                        : 'Minimalista'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Esquema de cores */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Principal
                </label>
                <div className="flex gap-2">
                  {(['blue', 'green', 'purple', 'gray'] as const).map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setPdfOptions((prev) => ({
                            ...prev,
                            colorScheme: color,
                          }))
                        }
                        className={`
                        w-8 h-8 rounded-full border-2
                        ${
                          pdfOptions.colorScheme === color
                            ? 'border-gray-400'
                            : 'border-gray-200'
                        }
                        ${
                          color === 'blue'
                            ? 'bg-green-600'
                            : color === 'green'
                            ? 'bg-green-600'
                            : color === 'purple'
                            ? 'bg-purple-600'
                            : 'bg-gray-600'
                        }
                      `}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Tamanho da fonte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamanho da Fonte
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['small', 'medium', 'large'] as const).map((fontSize) => (
                    <button
                      key={fontSize}
                      onClick={() =>
                        setPdfOptions((prev) => ({ ...prev, fontSize }))
                      }
                      className={`
                        px-3 py-2 text-sm rounded-md border
                        ${
                          pdfOptions.fontSize === fontSize
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                    >
                      {fontSize === 'small'
                        ? 'Pequena'
                        : fontSize === 'medium'
                        ? 'Média'
                        : 'Grande'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors"
              >
                {isExporting ? 'Gerando...' : 'Gerar PDF'}
              </button>
              <button
                onClick={() => setShowOptions(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip quando desabilitado */}
      {!hasContent && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Adicione informações ao currículo primeiro
        </div>
      )}
    </div>
  );
}

export default ExportButton;
