import * as pdfjs from 'pdfjs-dist';
import './pdfjs-init';

export async function handleFileUpload(file: File): Promise<string> {
  if (!file) throw new Error('No file provided');

  if (file.type !== 'application/pdf') {
    console.error('Invalid file type:', file.type);
    throw new Error('Please upload a PDF file');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Detailed error:', error);
    throw new Error(`Error reading PDF file: ${error.message}`);
  }
} 