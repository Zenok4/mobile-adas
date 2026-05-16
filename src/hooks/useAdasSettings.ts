import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AdasSettings {
  soundEnabled: boolean;
  autoCamera: boolean;

  alert: {
    volume: number;
    frequency: 'high' | 'medium' | 'low';
  };

  display: {
    theme: string;
    showWeather: boolean;
    showTime: boolean;
    showLocation: boolean;
    showTemperature: boolean;
    showOverlay: boolean;
  };
}

const DEFAULT_SETTINGS: AdasSettings = {
  soundEnabled: true,
  autoCamera: true,

  alert: {
    volume: 80,
    frequency: 'medium',
  },

  display: {
    theme: 'system',
    showWeather: true,
    showTime: true,
    showLocation: true,
    showTemperature: true,
    showOverlay: true,
  },
};

export const useAdasSettings = () => {
  const [settings, setSettings] =
    useState<AdasSettings>(DEFAULT_SETTINGS);

  const [isLoaded, setIsLoaded] = useState(false);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('adas_settings');

      if (saved) {
        const parsed = JSON.parse(saved);

        setSettings(prev => ({
          ...prev,
          ...parsed,

          alert: {
            ...prev.alert,
            ...(parsed.alert || {}),
          },

          display: {
            ...prev.display,
            ...(parsed.display || {}),
          },
        }));
      }
    } catch (e) {
      console.warn('Không đọc được cấu hình ADAS');
    } finally {
      setIsLoaded(true);
    }
  };

  const saveSettings = async (updated: AdasSettings) => {
    try {
      setSettings(updated);

      await AsyncStorage.setItem(
        'adas_settings',
        JSON.stringify(updated),
      );
    } catch (e) {
      console.error('Lỗi lưu cấu hình:', e);
    }
  };

  const updateSettings = async (
    newSettings: Partial<AdasSettings>,
  ) => {
    const updated = {
      ...settings,
      ...newSettings,

      alert: {
        ...settings.alert,
        ...(newSettings.alert || {}),
      },

      display: {
        ...settings.display,
        ...(newSettings.display || {}),
      },
    };

    await saveSettings(updated);
  };

  const toggleDisplay = async (
    key: keyof AdasSettings['display'],
  ) => {
    const updated = {
      ...settings,

      display: {
        ...settings.display,
        [key]: !settings.display[key],
      },
    };

    await saveSettings(updated);
  };

  const toggleSetting = async (
    key: 'soundEnabled' | 'autoCamera',
  ) => {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    await saveSettings(updated);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    isLoaded,

    updateSettings,
    toggleDisplay,
    toggleSetting,
  };
};