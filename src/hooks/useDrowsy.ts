// src/hooks/useDrowsy.ts
// Port từ useDrowsy.ts của ADAS web, thay HTMLVideoElement → frame callback
import { useState, useCallback, useEffect, useRef } from 'react';
import { CoreFunctionService, DrowsyResult } from '../services/core-function-service';

type DrowsyData = DrowsyResult['data'] | null;

interface UseDrowsyOptions {
  enabled: boolean;
  intervalMs?: number;
  soundEnabled?: boolean;
  userId?: string;
  latitude?: number;
  longitude?: number;
  /** Callback cung cấp base64 frame hiện tại từ camera */
  captureFrame: () => Promise<string | null>;
}

/** Badge state tương tự ADAS web */
export type DrowsyState =
  | 'LEFT'
  | 'RIGHT'
  | 'CENTER'
  | 'DROWSY'
  | 'NO_FACE'
  | 'AWAKE'
  | null;

function parseDrowsyState(message: string): DrowsyState {
  if (!message) return null;
  if (message.includes('NGU GUC SANG TRAI')) return 'LEFT';
  if (message.includes('NGU GUC SANG PHAI')) return 'RIGHT';
  if (message.includes('NGU GAT')) return 'CENTER';
  if (message.includes('Drowsy')) return 'DROWSY';
  if (message.includes('FOCUS')) return 'NO_FACE';
  return 'AWAKE';
}

export interface DrowsyBadge {
  text: string;
  color: string; // hex color
  pulsing: boolean;
}

function buildBadge(state: DrowsyState, busy: boolean): DrowsyBadge | null {
  if (busy) return { text: 'Đang xử lý...', color: '#3b82f6', pulsing: false };
  switch (state) {
    case 'LEFT':
      return { text: 'Ngủ gật nghiêng trái', color: '#dc2626', pulsing: true };
    case 'RIGHT':
      return { text: 'Ngủ gật nghiêng phải', color: '#dc2626', pulsing: true };
    case 'CENTER':
      return { text: 'Tài xế ngủ gật', color: '#dc2626', pulsing: true };
    case 'DROWSY':
      return { text: 'Buồn ngủ', color: '#f59e0b', pulsing: false };
    case 'NO_FACE':
      return { text: 'Không nhận diện khuôn mặt', color: '#6b7280', pulsing: false };
    case 'AWAKE':
      return { text: 'Tài xế tỉnh táo', color: '#10b981', pulsing: false };
    default:
      return null;
  }
}

export function useDrowsy({
  enabled,
  intervalMs = 1200,
  soundEnabled = true,
  userId,
  latitude,
  longitude,
  captureFrame,
}: UseDrowsyOptions) {
  const [result, setResult] = useState<DrowsyData>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  const captureAndSend = useCallback(async () => {
    if (busyRef.current) return;
    const base64 = await captureFrame();
    if (!base64) return;

    busyRef.current = true;
    setBusy(true);
    try {
      const res = await CoreFunctionService.drowsy(
        base64,
        userId,
        latitude,
        longitude,
      );
      const data = res.data?.data ?? null;
      setResult(data);

      // Audio alert (RN - placeholder, integrate with expo-speech or tts library)
      if (data?.is_drowsy && soundEnabled) {
        console.warn('[DROWSY ALERT] Cảnh báo buồn ngủ!');
        // TODO: integrate react-native-tts or expo-speech
      }
    } catch (err) {
      console.error('[useDrowsy] API error:', err);
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }, [captureFrame, userId, latitude, longitude, soundEnabled]);

  useEffect(() => {
    if (!enabled) {
      setResult(null);
      return;
    }
    // Gọi ngay lần đầu
    captureAndSend();
    const timer = setInterval(captureAndSend, intervalMs);
    return () => clearInterval(timer);
  }, [enabled, intervalMs, captureAndSend]);

  const drowsyState = parseDrowsyState(result?.message ?? '');
  const badge = buildBadge(enabled ? drowsyState : null, busy && enabled);
  const isDanger = drowsyState === 'LEFT' ||
    drowsyState === 'RIGHT' ||
    drowsyState === 'CENTER';

  return { result, busy, badge, isDanger, drowsyState };
}
