import { useState, useCallback } from 'react';
import { CVData, Skill, Experience, PersonalInfoUpdate, SkillCreate, SkillUpdate, ExperienceCreate, ExperienceUpdate } from '../types/cv.types';

const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: ''
  },
  skills: [],
  experiences: []
};

export function useCVData() {
  const [cvData, setCVData] = useState<CVData>(initialCVData);

  const updatePersonalInfo = useCallback((info: PersonalInfoUpdate) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  }, []);

  const addSkill = useCallback((skill: SkillCreate) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString()
    };
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  }, []);

  const updateSkill = useCallback((id: string, skillUpdate: SkillUpdate) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...skillUpdate } : skill
      )
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, []);

  const addExperience = useCallback((experience: ExperienceCreate) => {
    const newExperience: Experience = {
      ...experience,
      id: Date.now().toString()
    };
    setCVData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  }, []);

  const updateExperience = useCallback((id: string, experienceUpdate: ExperienceUpdate) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, ...experienceUpdate } : exp
      )
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  }, []);

  return {
    cvData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience
  };
}