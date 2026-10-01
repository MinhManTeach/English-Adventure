/**
 * Browser SpeechSynthesis audio service for English pronunciation.
 * Allows children to hear words and sentences clearly.
 * Fallbacks gracefully if SpeechSynthesis is unavailable or blocked.
 */

class AudioService {
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isLoaded = false;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const load = () => {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0) {
        this.isLoaded = true;
        // Find best English voice (en-US, en-GB, English)
        const preferredVoices = this.voices.filter(v =>
          v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.localService)
        );
        this.selectedVoice = preferredVoices[0] || this.voices.find(v => v.lang.startsWith('en')) || null;
      }
    };

    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(
    text: string,
    options?: {
      rate?: number; // 0.8 to 1.2
      pitch?: number;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): void {
    if (!this.isSupported()) {
      options?.onError?.();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance

      const cleanText = text.trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = options?.rate ?? 0.9; // Slightly slower for child learners
      utterance.pitch = options?.pitch ?? 1.05;

      if (!this.selectedVoice && !this.isLoaded) {
        this.voices = window.speechSynthesis.getVoices();
        this.selectedVoice = this.voices.find(v => v.lang.startsWith('en')) || null;
      }

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onend = () => {
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        options?.onError?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      options?.onError?.();
    }
  }

  public stop(): void {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Safe ignore
      }
    }
  }
}

export const audioService = new AudioService();
