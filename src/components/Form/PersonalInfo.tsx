
import { User } from 'lucide-react';
import { PersonalInfo as PersonalInfoType, PersonalInfoUpdate } from '../../types/cv.types';
import AIEnhanceButton from './AIEnhanceButton';

interface PersonalInfoProps {
  personalInfo: PersonalInfoType;
  updatePersonalInfo: (info: PersonalInfoUpdate) => void;
}

function PersonalInfo({
  personalInfo,
  updatePersonalInfo,
}: PersonalInfoProps) {
  const handleChange = (field: keyof PersonalInfoType, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5" /> Dados Pessoais
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Informações básicas para contato
        </p>
      </div>

      {/* Nome Completo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome Completo *
        </label>
        <input
          type="text"
          value={personalInfo.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Seu nome completo"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="seu.email@exemplo.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Telefone e LinkedIn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/seuperfil"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Resumo Profissional */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Resumo Profissional
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {personalInfo.summary.length}/300
            </span>
            <AIEnhanceButton
              text={personalInfo.summary}
              context="summary"
              onEnhanced={(enhancedText) =>
                handleChange('summary', enhancedText)
              }
              size="small"
            />
          </div>
        </div>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
          maxLength={300}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Este resumo aparecerá no topo do seu currículo
        </p>
      </div>
    </div>
  );
}

export default PersonalInfo;
