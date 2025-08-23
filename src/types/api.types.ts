export interface AIRequest {
  text: string;
  context: 'summary' | 'experience' | 'general';
  targetAudience?: string;
  keywords?: string[];
}

export interface AIResponse {
  enhancedText: string;
  improvements: string[];
  confidence: number;
}

export interface APIError {
  message: string;
  code: string;
  details?: any;
}

export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  progress?: number;
}


export interface PDFOptions {
  theme: 'modern' | 'classic' | 'minimal';
  colorScheme: 'blue' | 'green' | 'purple' | 'gray';
  fontSize: 'small' | 'medium' | 'large';
  includePhoto?: boolean;
}