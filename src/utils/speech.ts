// Web Speech API wrapper for pronunciation with enhanced youthful / young female (girl-like) voice tuning

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  isGirlPreferred?: boolean;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoiceURI: string = '';
  private pitch: number = 1.35; // Bright, youthful, cheerful girl tone
  private rate: number = 0.88; // Clear pedagogical pace for primary students

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    // Filter for English voices
    return this.voices.filter(v => v.lang.startsWith('en'));
  }

  public setVoiceURI(uri: string) {
    this.selectedVoiceURI = uri;
  }

  public setPitch(pitch: number) {
    this.pitch = Math.max(0.5, Math.min(2.0, pitch));
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(1.5, rate));
  }

  public getPitch(): number {
    return this.pitch;
  }

  public getRate(): number {
    return this.rate;
  }

  /**
   * Find the most beautiful, sweet, and clear young female voice available on the device
   */
  private findBestGirlVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }

    if (this.selectedVoiceURI) {
      const matched = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (matched) return matched;
    }

    const englishVoices = this.voices.filter(v => 
      v.lang.startsWith('en-US') || 
      v.lang.startsWith('en-GB') || 
      v.lang.startsWith('en-AU') || 
      v.lang.startsWith('en-CA') || 
      v.lang.startsWith('en')
    );

    if (englishVoices.length === 0) return null;

    // Prioritized list of known high-quality, melodic, youthful female voices across OS platforms:
    // Chrome/Google: "Google US English", "Google UK English Female", "Natural"
    // Apple/iOS/macOS: "Samantha", "Ava", "Victoria", "Karen", "Serena", "Moira", "Tessa"
    // Windows: "Microsoft Jenny Online (Natural)", "Microsoft Aria Online (Natural)", "Microsoft Zira", "Microsoft Mia"
    // Android: high-pitch child/female voices
    const girlKeywords = [
      'jenny', 'aria', 'ava', 'samantha', 'victoria', 'serena', 'karen', 'zoe', 
      'female', 'girl', 'child', 'natural', 'google uk english female', 'google us english'
    ];

    for (const keyword of girlKeywords) {
      const found = englishVoices.find(v => 
        v.name.toLowerCase().includes(keyword) || 
        v.voiceURI.toLowerCase().includes(keyword)
      );
      if (found) return found;
    }

    // Default to first US/UK English voice
    return englishVoices[0] || null;
  }

  public speak(
    text: string, 
    customRate?: number, 
    onStart?: () => void, 
    onEnd?: () => void,
    onError?: () => void,
    customPitch?: number
  ) {
    if (!this.synth) {
      if (onError) onError();
      return;
    }

    // Cancel any ongoing speech cleanly
    this.synth.cancel();

    // Clean up blank underscores or tokens so it flows naturally
    const cleanedText = text
      .replace(/_{2,}/g, '... ')
      .replace(/\[blank\]/gi, '... ')
      .replace(/【\s*(.*?)\s*】/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'en-US';
    
    // 1.3 - 1.4 pitch combined with 0.88 rate transforms standard voices into a sweet, vibrant, clear girl voice
    utterance.pitch = customPitch !== undefined ? customPitch : this.pitch;
    utterance.rate = customRate !== undefined ? customRate : this.rate;

    const bestVoice = this.findBestGirlVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Don't treat user-initiated cancel as error
      this.currentUtterance = null;
      if (onError && e.error !== 'canceled') {
        onError();
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechService();
