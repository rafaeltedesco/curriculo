import { useState, useCallback } from 'react';
import { enhanceText as aiEnhanceText, isAvailable } from '../services/aiService';
import { AIRequest, LoadingState } from '../types/api.types';
import toast from 'react-hot-toast';

export function useAIEnhancement() {
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false });

  const enhanceText = useCallback(async (
    text: string, 
    context: AIRequest['context'],
    onSuccess?: (enhancedText: string) => void
  ) => {
    if (!text.trim()) {
      toast.error('Adicione algum texto antes de usar a IA');
      return;
    }

    if (!isAvailable()) {
      toast.error('IA não configurada - Configure a API Key no topo da página');
      return;
    }

    setLoadingState({ 
      isLoading: true, 
      loadingText: 'Processando com IA...' 
    });

    try {
      const response = await aiEnhanceText({
        text,
        context,
        targetAudience: 'recruiter',
        keywords: ['profissional', 'experiência', 'competência']
      });

      if (response.enhancedText && response.enhancedText !== text) {
        onSuccess?.(response.enhancedText);
        toast.success(`Texto melhorado! ${response.improvements.length} melhorias aplicadas`);
      } else {
        toast('Texto já otimizado - O texto já está bem estruturado');
      }

    } catch (error) {
      console.error('Erro na melhoria por IA:', error);
      toast.error('Erro na IA - Não foi possível processar o texto. Tente novamente.');
    } finally {
      setLoadingState({ isLoading: false });
    }
  }, []);

  const isAIAvailable = useCallback(() => {
    return isAvailable();
  }, []);

  return {
    enhanceText,
    loadingState,
    isAIAvailable
  };
}