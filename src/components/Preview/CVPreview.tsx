
import { Mail, Phone, Briefcase, Wrench } from 'lucide-react';
import { CVData } from '../../types/cv.types';

interface CVPreviewProps {
  cvData: CVData;
}

function CVPreview({ cvData }: CVPreviewProps) {
  const { personalInfo, skills, experiences } = cvData;

  const getLevelDots = (level: string) => {
    const dots = level === 'Básico' ? 1 : level === 'Intermediário' ? 2 : 3;
    return '●'.repeat(dots) + '○'.repeat(3 - dots);
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
    <div className="max-w-2xl mx-auto bg-white">
      {/* Cabeçalho */}
      <div className="border-b-4 border-gree pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || (
            <span className="text-gray-400 italic">Seu Nome Completo</span>
          )}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email ? (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> {personalInfo.email}
            </div>
          ) : (
            <span className="text-gray-400 italic flex items-center gap-1">
              <Mail className="h-4 w-4" /> seu.email@exemplo.com
            </span>
          )}

          {personalInfo.phone ? (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" /> {personalInfo.phone}
            </div>
          ) : (
            <span className="text-gray-400 italic flex items-center gap-1">
              <Phone className="h-4 w-4" /> (11) 99999-9999
            </span>
          )}

          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> {personalInfo.linkedin}
            </div>
          )}
        </div>

        {personalInfo.summary ? (
          <p className="mt-4 text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        ) : (
          <p className="mt-4 text-gray-400 italic">
            Seu resumo profissional aparecerá aqui...
          </p>
        )}
      </div>

      {/* Habilidades */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5" /> Habilidades
        </h2>

        {skills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-900">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{skill.level}</span>
                  <span className="text-green-600 font-mono text-sm">
                    {getLevelDots(skill.level)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic bg-gray-50 p-4 rounded-lg text-center">
            Suas habilidades aparecerão aqui conforme você adiciona...
          </p>
        )}
      </div>

      {/* Experiência Profissional */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> Experiência Profissional
        </h2>

        {experiences.length > 0 ? (
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {index > 0 && (
                  <div className="absolute -top-3 left-4 w-px h-3 bg-gray-300"></div>
                )}

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-600 rounded-full mt-1"></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {experience.position}
                    </h3>
                    <p className="text-green-600 font-medium">
                      {experience.company}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(experience.startDate)} -{' '}
                      {formatDate(experience.endDate)}
                    </p>

                    {experience.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {experience.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic bg-gray-50 p-4 rounded-lg text-center">
            Suas experiências profissionais aparecerão aqui conforme você
            adiciona...
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="text-xs text-gray-500">
          Currículo gerado pelo Gerador de Currículos AI
        </p>
      </div>
    </div>
  );
}

export default CVPreview;
