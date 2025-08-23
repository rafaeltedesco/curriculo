
import { CVData } from '../../types/cv.types';
import CVPreview from '../Preview/CVPreview';

interface PreviewSectionProps {
  cvData: CVData;
}

function PreviewSection({ cvData }: PreviewSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-green-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Preview do Currículo
        </h2>
        <p className="text-green-100 text-sm mt-1">
          Visualização em tempo real
        </p>
      </div>

      {/* Preview Content */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
        <CVPreview cvData={cvData} />
      </div>
    </div>
  );
}

export default PreviewSection;
