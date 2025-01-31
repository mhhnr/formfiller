export class SpeechRecognitionService {
  recognition: SpeechRecognition | null = null;
  
  initialize(language: string, callbacks: {
    onResult: (transcript: string) => void;
    onError: (error: any) => void;
    onEnd: () => void;
  }) {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = language;

      this.recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        callbacks.onResult(currentTranscript);
      };

      this.recognition.onerror = callbacks.onError;
      this.recognition.onend = callbacks.onEnd;
    }
    return this.recognition;
  }
} 