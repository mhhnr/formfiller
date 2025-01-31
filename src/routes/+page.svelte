<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import { languages } from '$lib/data/languages';
  import { SpeechRecognitionService } from '$lib/services/speechRecognition';
  import { handleFileUpload } from '$lib/services/fileUpload';
  import PdfViewer from '../components/PdfViewer.svelte';

  let isListening = false;
  let transcript = '';
  let selectedLanguage = 'en-US';
  let pdfUrl: string | null = null;
  
  const speechService = new SpeechRecognitionService();
  let recognition = speechService.recognition;

  function initializeSpeechRecognition() {
    recognition = speechService.initialize(selectedLanguage, {
      onResult: (currentTranscript) => {
        transcript = currentTranscript;
      },
      onError: (event) => {
        console.error('Speech recognition error:', event.error);
      },
      onEnd: () => {
        if (isListening) {
          recognition?.start();
        }
      }
    });
  }

  function handleLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedLanguage = target.value;
    
    if (isListening) {
      recognition?.stop();
    }
    
    initializeSpeechRecognition();
  }

  onMount(() => {
    initializeSpeechRecognition();
  });

  function toggleListening() {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    isListening = !isListening;
    
    if (isListening) {
      transcript = '';
      recognition.start();
    } else {
      recognition.stop();
    }
  }

  async function onFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;

    try {
      // Create object URL for PDF viewer
      pdfUrl = URL.createObjectURL(file);
      
      // Get text content for transcription
      transcript = await handleFileUpload(file);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
      pdfUrl = null;
    }

    target.value = '';
  }

  // Clean up object URL when component is destroyed
  onDestroy(() => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</svelte:head>

<div class="app-container">
  <Header />

  <main>
    <div class="transcription-container">
      <div class="transcription-wrapper">
        <div 
          class="transcription-box" 
          class:active={isListening}
          aria-label="Transcription text"
          contenteditable="true"
          bind:innerHTML={transcript}
        >
          {#if !transcript}
            <p class="placeholder">Click the microphone icon and begin speaking...</p>
          {/if}
        </div>
      </div>

      <div class="controls-container">
        <div class="controls-wrapper">
          <div class="language-select">
            <span class="material-icons-round">language</span>
            <select value={selectedLanguage} on:change={handleLanguageChange}>
              {#each languages as language}
                <option value={language.code}>{language.name}</option>
              {/each}
            </select>
          </div>

          <button 
            class="upload-button" 
            on:click={() => document.getElementById('fileInput').click()}
            aria-label="Upload file"
          >
            <span class="material-icons-round">upload_file</span>
          </button>
          
          <button 
            class="mic-button" 
            on:click={toggleListening}
            class:listening={isListening}
            aria-label="Toggle microphone"
          >
            <span class="material-icons-round">
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>
        </div>
      </div>

      <PdfViewer {pdfUrl} />

      <input 
        type="file" 
        id="fileInput" 
        accept=".pdf"
        style="display: none;"
        on:change={onFileUpload}
      />
    </div>
  </main>

  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background: #f5f5f5;
    color: #333;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
  }

  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    margin-top: 1rem;
  }

  .transcription-container {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .transcription-wrapper {
    position: relative;
    width: 100%;
  }

  .transcription-box {
    position: relative;
    min-height: 150px;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    padding-right: 4rem;
    border: 2px solid transparent;
    font-size: 1rem;
    line-height: 1.6;
    overflow-y: auto;
    max-height: 50vh;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .transcription-box.active {
    border-color: #000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .transcription-box p {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .placeholder {
    color: #999;
    font-style: italic;
  }

  .controls-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    width: 100%;
  }

  .controls-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .upload-button {
    position: relative;
    background: white;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .upload-button:hover {
    transform: scale(1.05);
    background: #f5f5f5;
  }

  .upload-button .material-icons-round {
    font-size: 24px;
    color: #000;
  }

  .mic-button {
    position: relative;
    background: white;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .mic-button:hover {
    transform: scale(1.05);
  }

  .mic-button.listening {
    background: #000;
    animation: pulse 2s infinite;
  }

  .mic-button.listening .material-icons-round {
    color: white;
  }

  .mic-button .material-icons-round {
    font-size: 24px;
    color: #000;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2); }
    70% { box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
  }

  .language-select {
    display: flex;
    align-items: center;
    background: white;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    margin: 0 auto;
    max-width: fit-content;
  }

  .language-select .material-icons-round {
    color: #666;
    margin-right: 0.5rem;
    font-size: 20px;
  }

  select {
    border: none;
    background: none;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    color: #333;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    max-width: 200px;
  }

  @media (max-width: 768px) {
    .logo {
      width: 50px;
      height: 50px;
    }

    h1 {
      font-size: 1.5rem;
    }

    main {
      padding: 0.5rem;
    }

    .transcription-box {
      padding: 1.25rem;
      padding-right: 4rem;
      font-size: 0.95rem;
    }

    .upload-button {
      width: 40px;
      height: 40px;
    }

    .upload-button .material-icons-round {
      font-size: 20px;
    }

    .mic-button {
      width: 40px;
      height: 40px;
    }

    .mic-button .material-icons-round {
      font-size: 20px;
    }

    select {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      padding: 0 0.5rem;
    }

    .subtitle {
      font-size: 0.8rem;
    }

    .transcription-box {
      min-height: 120px;
      padding: 1rem;
      padding-right: 3.5rem;
    }

    .language-select {
      padding: 0.4rem 0.8rem;
    }

    select {
      max-width: 150px;
    }
  }

  @media (min-height: 700px) {
    .transcription-box {
      min-height: 200px;
    }
  }
</style>
