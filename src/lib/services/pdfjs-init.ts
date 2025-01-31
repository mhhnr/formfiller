import * as pdfjs from 'pdfjs-dist';

// Only initialize PDF.js in the browser
if (typeof window !== 'undefined') {
  const workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  );

  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc.toString();
  console.log('PDF.js worker initialized with version:', pdfjs.version);
}

export default pdfjs; 