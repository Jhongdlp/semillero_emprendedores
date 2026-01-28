import { pdf } from '@react-pdf/renderer';
import { ProjectPDFDocument } from './project-pdf-template';
import type { ProjectProfile } from '@/types/project';

export async function generateProjectPDF(data: ProjectProfile) {
  try {
    // Generate PDF blob
    const blob = await pdf(<ProjectPDFDocument data={data} />).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Create filename from project name
    const projectName = data.generalData?.projectName || 'proyecto';
    const sanitizedName = projectName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    link.download = `perfil-proyecto-${sanitizedName}.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
