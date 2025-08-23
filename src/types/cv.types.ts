export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PersonalInfoUpdate {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  summary?: string;
}

export interface SkillCreate {
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado';
}

export interface SkillUpdate {
  name?: string;
  level?: 'Básico' | 'Intermediário' | 'Avançado';
}

export interface ExperienceCreate {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceUpdate {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
}

export interface CVContextType {
  cvData: CVData;
  updatePersonalInfo: (info: PersonalInfoUpdate) => void;
  addSkill: (skill: SkillCreate) => void;
  updateSkill: (id: string, skill: SkillUpdate) => void;
  removeSkill: (id: string) => void;
  addExperience: (experience: ExperienceCreate) => void;
  updateExperience: (id: string, experience: ExperienceUpdate) => void;
  removeExperience: (id: string) => void;
}
