import { Sparkles, Settings } from 'lucide-react';
import { useAIEnhancement } from '../../hooks/useAIEnhancement';
import { AIRequest } from '../../types/api.types';

interface AIEnhanceButtonProps {
  text: string;
  context: AIRequest['context'];
  onEnhanced: (enhancedText: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

function AIEnhanceButton({
  text,
  context,
  onEnhanced,
  className = '',
  size = 'medium',
}: AIEnhanceButtonProps) {
  const { enhanceText, loadingState, isAIAvailable } = useAIEnhancement();

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const handleClick = async () => {
    await enhanceText(text, context, onEnhanced);
  };

  if (!isAIAvailable()) {
    return (
      <div className="relative group">
        <button
          disabled
          className={`${sizeClasses[size]} bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed transition-colors flex items-center gap-2 ${className}`}
        >
          <Settings className="h-4 w-4" />
          Configurar IA
        </button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Clique em "Configurar IA" no topo
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loadingState.isLoading || !text.trim()}
      className={`
        ${sizeClasses[size]}
        ${
          loadingState.isLoading
            ? 'bg-green-400 cursor-wait'
            : 'bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700'
        }
        text-white rounded-lg transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl transform hover:scale-105
        flex items-center gap-2
        ${className}
      `}
    >
      {loadingState.isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processando...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <span>Melhorar</span>
        </>
      )}
    </button>
  );
}

export default AIEnhanceButton;
