//auth-front/src/react-speech-recognition.d.ts
declare module 'react-speech-recognition' {
    export interface SpeechRecognitionOptions {
      lang?: string;
      continuous?: boolean;
      interimResults?: boolean;
    }
  
    export interface SpeechRecognition {
      startListening: (options?: SpeechRecognitionOptions) => void;
      stopListening: () => void;
      abortListening: () => void;
    }
  
    export interface UseSpeechRecognition {
      transcript: string;
      listening: boolean;
      resetTranscript: () => void;
      browserSupportsSpeechRecognition: boolean;
      browserSupportsContinuousListening: boolean;
    }
  
    export function useSpeechRecognition(): UseSpeechRecognition;
    export const SpeechRecognition: SpeechRecognition;
}
