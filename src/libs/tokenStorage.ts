import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import Config from 'react-native-config';

const SECRET_KEY = Config.REACT_APP_SECRET_KEY || 'default-secret-key';
let memorySessionId: string | null = null;

// ================= Encrypt / Decrypt =================
export const encrypt = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decrypt = (cipher: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
};

// ================= AsyncStorage Helpers =================
export const saveToken = async (token: string): Promise<void> => {
  const encrypted = encrypt(token);
  await AsyncStorage.setItem('access_token', encrypted);
  console.log('Token saved');
};

export const loadToken = async (): Promise<string | null> => {
  const encrypted = await AsyncStorage.getItem('access_token');
  if (!encrypted) return null;
  return decrypt(encrypted);
};

export const clearToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('access_token');
};

// ================= SESSION ID =================
export const saveSessionId = async (sessionId: string): Promise<void> => {
  memorySessionId = sessionId;
  const encrypted = encrypt(sessionId);
  await AsyncStorage.setItem('session_id', encrypted);
};

export const loadSessionId = async (): Promise<string | null> => {
  if (memorySessionId) return memorySessionId;

  const encrypted = await AsyncStorage.getItem('session_id');
  if (!encrypted) return null;

  const decrypted = decrypt(encrypted);
  memorySessionId = decrypted;
  return decrypted;
};

export const clearSessionId = async (): Promise<void> => {
  memorySessionId = null;
  await AsyncStorage.removeItem('session_id');
};
