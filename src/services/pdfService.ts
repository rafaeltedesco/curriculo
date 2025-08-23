import jsPDF from 'jspdf';
import { CVData } from '../types/cv.types';
import { PDFOptions } from '../types/api.types';

const getTheme = (options: PDFOptions) => {
  const themes = {
    modern: {
      primaryColor: [41, 128, 185] as [number, number, number],
      secondaryColor: [52, 73, 94] as [number, number, number],
      textColor: [44, 62, 80] as [number, number, number]
    },
    classic: {
      primaryColor: [34, 34, 34] as [number, number, number],
      secondaryColor: [68, 68, 68] as [number, number, number],
      textColor: [51, 51, 51] as [number, number, number]
    },
    minimal: {
      primaryColor: [95, 95, 95] as [number, number, number],
      secondaryColor: [128, 128, 128] as [number, number, number],
      textColor: [64, 64, 64] as [number, number, number]
    }
  };

  return themes[options.theme];
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
};

const checkPageBreak = (doc: jsPDF, yPosition: number, requiredSpace: number, margin: number, pageHeight: number) => {
  if (yPosition + requiredSpace > pageHeight - 30) {
    doc.addPage();
    return margin;
  }
  return yPosition;
};

const addHeader = (doc: jsPDF, personalInfo: any, theme: any, margin: number, yPosition: number) => {
  // Nome principal
  doc.setFontSize(24);
  doc.setTextColor(theme.primaryColor[0], theme.primaryColor[1], theme.primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(personalInfo.fullName || 'Nome não informado', margin, yPosition);
  yPosition += 12;

  // Linha separadora
  doc.setDrawColor(theme.primaryColor[0], theme.primaryColor[1], theme.primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, 190, yPosition);
  yPosition += 8;

  // Informações de contato
  doc.setFontSize(10);
  doc.setTextColor(theme.textColor[0], theme.textColor[1], theme.textColor[2]);
  doc.setFont('helvetica', 'normal');
  
  const contacts = [];
  if (personalInfo.email) contacts.push(`Email: ${personalInfo.email}`);
  if (personalInfo.phone) contacts.push(`Telefone: ${personalInfo.phone}`);
  if (personalInfo.linkedin) contacts.push(`LinkedIn: ${personalInfo.linkedin}`);
  
  const contactText = contacts.join('  •  ');
  doc.text(contactText, margin, yPosition);
  yPosition += 15;

  return yPosition;
};

const addSection = (doc: jsPDF, title: string, content: () => number, theme: any, margin: number, yPosition: number, pageHeight: number) => {
  yPosition = checkPageBreak(doc, yPosition, 20, margin, pageHeight);
  
  // Título da seção
  doc.setFontSize(14);
  doc.setTextColor(theme.primaryColor[0], theme.primaryColor[1], theme.primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, yPosition);
  yPosition += 8;

  // Linha sob o título
  doc.setDrawColor(theme.primaryColor[0], theme.primaryColor[1], theme.primaryColor[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, 190, yPosition);
  yPosition += 8;

  // Conteúdo da seção
  yPosition = content();
  yPosition += 8;

  return yPosition;
};

const addParagraph = (doc: jsPDF, text: string, theme: any, margin: number, yPosition: number, pageHeight: number) => {
  doc.setFontSize(10);
  doc.setTextColor(theme.textColor[0], theme.textColor[1], theme.textColor[2]);
  doc.setFont('helvetica', 'normal');
  
  const lines = doc.splitTextToSize(text, 170);
  yPosition = checkPageBreak(doc, yPosition, lines.length * 5, margin, pageHeight);
  
  doc.text(lines, margin, yPosition);
  yPosition += lines.length * 5;

  return yPosition;
};

const addSkills = (doc: jsPDF, skills: any[], theme: any, margin: number, yPosition: number, pageHeight: number) => {
  if (skills.length === 0) {
    return addParagraph(doc, 'Nenhuma habilidade cadastrada', theme, margin, yPosition, pageHeight);
  }

  doc.setFontSize(10);
  doc.setTextColor(theme.textColor[0], theme.textColor[1], theme.textColor[2]);
  
  const skillsPerRow = 2;
  const columnWidth = 85;
  
  for (let i = 0; i < skills.length; i += skillsPerRow) {
    yPosition = checkPageBreak(doc, yPosition, 8, margin, pageHeight);
    
    for (let j = 0; j < skillsPerRow && i + j < skills.length; j++) {
      const skill = skills[i + j];
      const x = margin + (j * columnWidth);
      
      // Nome da habilidade
      doc.setFont('helvetica', 'bold');
      doc.text(skill.name, x, yPosition);
      
      // Nível da habilidade
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(theme.secondaryColor[0], theme.secondaryColor[1], theme.secondaryColor[2]);
      doc.text(skill.level, x + 40, yPosition);
      
      // Indicador visual do nível
      const dots = skill.level === 'Básico' ? '●○○' : 
                   skill.level === 'Intermediário' ? '●●○' : '●●●';
      doc.text(dots, x + 65, yPosition);
    }
    
    yPosition += 8;
    doc.setTextColor(theme.textColor[0], theme.textColor[1], theme.textColor[2]);
  }

  return yPosition;
};

const addExperiences = (doc: jsPDF, experiences: any[], theme: any, margin: number, yPosition: number, pageHeight: number) => {
  if (experiences.length === 0) {
    return addParagraph(doc, 'Nenhuma experiência cadastrada', theme, margin, yPosition, pageHeight);
  }

  experiences.forEach((exp) => {
    yPosition = checkPageBreak(doc, yPosition, 25, margin, pageHeight);
    
    // Cargo e empresa
    doc.setFontSize(12);
    doc.setTextColor(theme.primaryColor[0], theme.primaryColor[1], theme.primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.position, margin, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setTextColor(theme.secondaryColor[0], theme.secondaryColor[1], theme.secondaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.company, margin, yPosition);
    
    // Período
    const period = `${formatDate(exp.startDate)} - ${exp.current ? 'Atual' : formatDate(exp.endDate)}`;
    doc.text(period, 190 - doc.getTextWidth(period), yPosition);
    yPosition += 8;
    
    // Descrição
    if (exp.description) {
      doc.setTextColor(theme.textColor[0], theme.textColor[1], theme.textColor[2]);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(exp.description, 170);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 4;
    }
    
    yPosition += 6;
  });

  return yPosition;
};

const addFooter = (doc: jsPDF, margin: number, pageHeight: number) => {
  const pageCount = doc.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Linha superior do footer
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 20, 190, pageHeight - 20);
    
    // Texto do footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.setFont('helvetica', 'normal');
    
    const footerText = 'Gerado pelo Gerador de Currículos AI';
    doc.text(footerText, margin, pageHeight - 12);
    
    // Número da página
    const pageText = `Página ${i} de ${pageCount}`;
    doc.text(pageText, 190 - doc.getTextWidth(pageText), pageHeight - 12);
  }
};

export const generatePDF = async (cvData: CVData, options: PDFOptions = { theme: 'modern', colorScheme: 'green', fontSize: 'medium' }): Promise<Blob> => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;
  
  // Configurar tema e cores
  const theme = getTheme(options);
  
  // Gerar seções do CV
  yPosition = addHeader(doc, cvData.personalInfo, theme, margin, yPosition);
  
  yPosition = addSection(doc, 'RESUMO PROFISSIONAL', () => {
    return addParagraph(doc, cvData.personalInfo.summary || 'Resumo não informado', theme, margin, yPosition, pageHeight);
  }, theme, margin, yPosition, pageHeight);
  
  yPosition = addSection(doc, 'HABILIDADES', () => {
    return addSkills(doc, cvData.skills, theme, margin, yPosition, pageHeight);
  }, theme, margin, yPosition, pageHeight);
  
  yPosition = addSection(doc, 'EXPERIÊNCIA PROFISSIONAL', () => {
    return addExperiences(doc, cvData.experiences, theme, margin, yPosition, pageHeight);
  }, theme, margin, yPosition, pageHeight);
  
  // Adicionar footer
  addFooter(doc, margin, pageHeight);
  
  return doc.output('blob');
};

export const downloadPDF = async (cvData: CVData, options: PDFOptions = { theme: 'modern', colorScheme: 'green', fontSize: 'medium' }): Promise<void> => {
  const blob = await generatePDF(cvData, options);
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `curriculo-${cvData.personalInfo.fullName || 'cv'}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};