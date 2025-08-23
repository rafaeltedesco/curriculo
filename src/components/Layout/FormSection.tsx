
import { CVContextType } from '../../types/cv.types';
import PersonalInfo from '../Form/PersonalInfo';
import Skills from '../Form/Skills';
import Experience from '../Form/Experience';

interface FormSectionProps extends CVContextType {}

function FormSection(props: FormSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-0">
      {/* Header */}
      <div className="bg-gray-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Informações do Currículo
        </h2>
        <p className="text-green-100 text-sm mt-1">
          Preencha os dados e veja o preview em tempo real
        </p>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-8 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-280px)] custom-scrollbar">
        <PersonalInfo
          personalInfo={props.cvData.personalInfo}
          updatePersonalInfo={props.updatePersonalInfo}
        />

        <Skills
          skills={props.cvData.skills}
          addSkill={props.addSkill}
          updateSkill={props.updateSkill}
          removeSkill={props.removeSkill}
        />

        <Experience
          experiences={props.cvData.experiences}
          addExperience={props.addExperience}
          removeExperience={props.removeExperience}
        />
      </div>
    </div>
  );
}

export default FormSection;
