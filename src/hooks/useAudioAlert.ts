import Tts from 'react-native-tts';
import { useEffect, useCallback, useRef } from 'react';

export const useAudioAlert = (soundEnabled: boolean = true) => {
  useEffect(() => {
    Tts.setDefaultLanguage('vi-VN');
    return () => {
      Tts.stop();
    };
  }, []);

  const lastSpeakRef = useRef({ text: '', time: 0 });

  const speak = useCallback(
    (text: string, isUrgent: boolean = false) => {
      if (!text || !soundEnabled) return;

      const now = Date.now();
      const isSameText = text === lastSpeakRef.current.text;
      const timeDiff = now - lastSpeakRef.current.time;

      // Chống spam: 1.5s khẩn cấp, 3s thường
      const threshold = isUrgent ? 1500 : 3000;
      if (isSameText && timeDiff < threshold) return;

      if (isUrgent) Tts.stop();
      Tts.speak(text);
      lastSpeakRef.current = { text, time: now };
    },
    [soundEnabled],
  );

  return {
    alertDrowsiness: (msg: string) => speak(msg, true),
    announceTrafficSign: (msg: string) => speak(msg, false),
    warnObstacle: (msg: string) => speak(msg, false),
  };
};
