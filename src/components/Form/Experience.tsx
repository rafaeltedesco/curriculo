import { useState } from 'react';
import { Briefcase, Plus, Trash2, Check, X } from 'lucide-react';
import { Experience, ExperienceCreate } from '../../types/cv.types';
import AIEnhanceButton from './AIEnhanceButton';

interface ExperienceProps {
  experiences: Experience[];
  addExperience: (experience: ExperienceCreate) => void;
  removeExperience: (id: string) => void;
}

function ExperienceForm({
  experiences,
  addExperience,
  removeExperience,
}: ExperienceProps) {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      addExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      setShowForm(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> Experiência Profissional
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Adicione suas experiências de trabalho mais relevantes
        </p>
      </div>

      {/* Botão Adicionar */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-500 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Experiência
        </button>
      )}

      {/* Formulário de Nova Experiência */}
      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa *
              </label>
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                placeholder="Nome da empresa"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo *
              </label>
              <input
                type="text"
                value={newExperience.position}
                onChange={(e) =>
                  setNewExperience((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
                placeholder="Seu cargo na empresa"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Início
              </label>
              <input
                type="month"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Fim
              </label>
              <div>
                <input
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) =>
                    setNewExperience((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Descrição das Atividades
              </label>
              <AIEnhanceButton
                text={newExperience.description}
                context="experience"
                onEnhanced={(enhancedText) =>
                  setNewExperience((prev) => ({
                    ...prev,
                    description: enhancedText,
                  }))
                }
                size="small"
              />
            </div>
            <textarea
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Descreva suas principais responsabilidades e conquistas..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddExperience}
              disabled={
                !newExperience.company.trim() || !newExperience.position.trim()
              }
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Adicionar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Experiências */}
      {experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {experience.position}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {experience.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(experience.startDate)} -{' '}
                    {formatDate(experience.endDate)}
                  </p>
                </div>
                <button
                  onClick={() => removeExperience(experience.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Remover experiência"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {experience.description && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {experience.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {experiences.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-400">
          <div className="mb-2">
            <Briefcase className="h-12 w-12 mx-auto text-gray-300" />
          </div>
          <p>Nenhuma experiência adicionada ainda</p>
          <p className="text-sm">Clique no botão acima para adicionar</p>
        </div>
      )}
    </div>
  );
}

export default ExperienceForm;
