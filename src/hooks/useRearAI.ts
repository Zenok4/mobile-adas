// src/hooks/useRearAI.ts
// Xử lý 3 AI pipeline: sign, lane, object cho camera hành trình
import { useState, useCallback, useEffect, useRef } from 'react';
import { CoreFunctionService, DetectionBox, parseLaneResponse, parseObjectResponse, parseSignResponse } from '../services/core-function-service';

interface UseRearAIOptions {
  enableSign: boolean;
  enableLane: boolean;
  enableObject: boolean;
  active: boolean;
  intervalMs?: number;
  soundEnabled?: boolean;
  userId?: string;
  latitude?: number;
  longitude?: number;
  captureFrame: () => Promise<string | null>;
}

export function useRearAI({
  enableSign,
  enableLane,
  enableObject,
  active,
  intervalMs = 1000,
  soundEnabled = true,
  userId,
  latitude,
  longitude,
  captureFrame,
}: UseRearAIOptions) {
  const [signs, setSigns] = useState<DetectionBox[]>([]);
  const [lanes, setLanes] = useState<DetectionBox[]>([]);
  const [objects, setObjects] = useState<DetectionBox[]>([]);

  const loadingSign = useRef(false);
  const loadingLane = useRef(false);
  const loadingObject = useRef(false);

  const sendFrame = useCallback(async () => {
    if (!active) return;
    if (!enableSign && !enableLane && !enableObject) return;

    const base64 = await captureFrame();
    if (!base64) return;

    // Strip data URI prefix if present
    const onlyBase64 = base64.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      '',
    );

    /* ── SIGN ── */
    if (enableSign && !loadingSign.current) {
      loadingSign.current = true;
      CoreFunctionService.sign(onlyBase64, userId, latitude, longitude)
        .then(res => {
          const detected = parseSignResponse(res);
          setSigns(detected);
          if (detected.length > 0 && soundEnabled) {
            const best = detected.reduce((a, b) =>
              a.confidence > b.confidence ? a : b,
            );
            console.log('[SIGN] Biển báo:', best.class_name);
            // TODO: TTS announce best.class_name
          }
        })
        .catch(console.error)
        .finally(() => { loadingSign.current = false; });
    }

    /* ── LANE ── */
    if (enableLane && !loadingLane.current) {
      loadingLane.current = true;
      CoreFunctionService.predictLane(onlyBase64, userId, latitude, longitude)
        .then(res => {
          setLanes(parseLaneResponse(res));
        })
        .catch(console.error)
        .finally(() => { loadingLane.current = false; });
    }

    /* ── OBJECT ── */
    if (enableObject && !loadingObject.current) {
      loadingObject.current = true;
      CoreFunctionService.object(onlyBase64, userId, latitude, longitude)
        .then(res => {
          const detected = parseObjectResponse(res);
          setObjects(detected);
          const danger = detected.find(o => o.confidence > 0.4);
          if (danger && soundEnabled) {
            console.warn('[OBJECT] Vật cản:', danger.class_name);
            // TODO: TTS warn
          }
        })
        .catch(console.error)
        .finally(() => { loadingObject.current = false; });
    }
  }, [
    active, enableSign, enableLane, enableObject,
    captureFrame, userId, latitude, longitude, soundEnabled,
  ]);

  useEffect(() => {
    if (!active || (!enableSign && !enableLane && !enableObject)) {
      setSigns([]);
      setLanes([]);
      setObjects([]);
      return;
    }
    // Gọi ngay lần đầu
    sendFrame();
    const timer = setInterval(sendFrame, intervalMs);
    return () => clearInterval(timer);
  }, [active, enableSign, enableLane, enableObject, intervalMs, sendFrame]);

  return { signs, lanes, objects };
}
