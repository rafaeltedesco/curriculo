import React, { useState } from 'react';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import { Skill, SkillCreate, SkillUpdate } from '../../types/cv.types';

interface SkillsProps {
  skills: Skill[];
  addSkill: (skill: SkillCreate) => void;
  updateSkill: (id: string, skill: SkillUpdate) => void;
  removeSkill: (id: string) => void;
}

function Skills({
  skills,
  addSkill,
  updateSkill,
  removeSkill,
}: SkillsProps) {
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Básico' as const,
  });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({ name: '', level: 'Básico' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico':
        return 'bg-yellow-100 text-yellow-800';
      case 'Intermediário':
        return 'bg-green-100 text-green-800';
      case 'Avançado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Wrench className="h-5 w-5" /> Habilidades
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Adicione suas principais competências técnicas
        </p>
      </div>

      {/* Adicionar Nova Habilidade */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, name: e.target.value }))
              }
              onKeyPress={handleKeyPress}
              placeholder="Nome da habilidade (ex: React, Python, Figma)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  level: e.target.value as any,
                }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lista de Habilidades */}
      {skills.length > 0 ? (
        <div className="space-y-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(skill.id, { name: e.target.value })
                  }
                  className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 flex-1"
                />
                <select
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(skill.id, { level: e.target.value as any })
                  }
                  className="text-sm border-none bg-transparent focus:outline-none focus:ring-0"
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                    skill.level
                  )}`}
                >
                  {skill.level}
                </span>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="ml-3 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remover habilidade"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <div className="mb-2">
            <Wrench className="h-12 w-12 mx-auto text-gray-300" />
          </div>
          <p>Nenhuma habilidade adicionada ainda</p>
          <p className="text-sm">
            Adicione suas principais competências técnicas
          </p>
        </div>
      )}
    </div>
  );
}

export default Skills;
