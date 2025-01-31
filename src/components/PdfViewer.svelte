<script lang="ts">
  import { onMount } from 'svelte';
  import * as pdfjs from 'pdfjs-dist';
  import '../lib/services/pdfjs-init';

  export let pdfUrl: string | null = null;
  let pdfContainer: HTMLElement;
  let scale = 1.0;
  let pdf: any = null;
  let currentPage = 1;
  let totalPages = 0;

  async function loadPDF(url: string) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      
      pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      totalPages = pdf.numPages;
      renderPage(currentPage);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async function renderPage(pageNumber: number) {
    if (!pdf) return;

    try {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      pdfContainer.innerHTML = '';
      pdfContainer.appendChild(canvas);
      
      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  }

  function zoomIn() {
    scale += 0.25;
    renderPage(currentPage);
  }

  function zoomOut() {
    if (scale > 0.5) {
      scale -= 0.25;
      renderPage(currentPage);
    }
  }

  $: if (pdfUrl) {
    loadPDF(pdfUrl);
  }
</script>

<div class="pdf-viewer">
  {#if pdfUrl}
    <div class="pdf-controls">
      <button on:click={prevPage} disabled={currentPage === 1}>
        <span class="material-icons-round">navigate_before</span>
      </button>
      <span class="page-info">Page {currentPage} of {totalPages}</span>
      <button on:click={nextPage} disabled={currentPage === totalPages}>
        <span class="material-icons-round">navigate_next</span>
      </button>
      <button on:click={zoomOut}>
        <span class="material-icons-round">zoom_out</span>
      </button>
      <button on:click={zoomIn}>
        <span class="material-icons-round">zoom_in</span>
      </button>
    </div>
    <div class="pdf-container" bind:this={pdfContainer}></div>
  {:else}
    <div class="placeholder">
      <span class="material-icons-round">picture_as_pdf</span>
      <p>Upload a PDF to view it here</p>
    </div>
  {/if}
</div>

<style>
  .pdf-viewer {
    width: 100%;
    background: white;
    border-radius: 12px;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .pdf-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
  }

  .pdf-controls button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }

  .pdf-controls button:hover:not(:disabled) {
    background: #f5f5f5;
  }

  .pdf-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 0.9rem;
    color: #666;
  }

  .pdf-container {
    width: 100%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
  }

  .pdf-container canvas {
    max-width: 100%;
    height: auto;
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: #999;
  }

  .placeholder .material-icons-round {
    font-size: 48px;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .pdf-controls {
      flex-wrap: wrap;
    }
  }
</style> 