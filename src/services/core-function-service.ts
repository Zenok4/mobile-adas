// src/services/core-function-service.ts
// Port từ coreFunctionService.ts của ADAS web
import { api } from '../libs/api';

const API_URLS = {
  drowsy: '/drowsy/detect',
  sign: '/sign/predict',
  lane: '/lane/predict',
  object: '/object/predict',
} as const;

// ─── Response types ────────────────────────────────────────────────────────
export interface DrowsyResult {
  code: number;
  data: {
    is_drowsy: boolean;
    message: string;
    eye_aspect_ratio: number;
    latency_ms: number;
    frame_count: number;
  };
  message: string;
  success: boolean;
}

export interface DetectionBox {
  class_name: string;
  box: number[]; // [x1, y1, x2, y2]
  confidence: number;
}

// ─── Helper: flatten mảng từ bất kỳ cấu trúc JSON nào ────────────────────
function extractArray(obj: any): any[] {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  if (typeof obj === 'object') {
    for (const key in obj) {
      if (Array.isArray(obj[key])) return obj[key];
    }
    for (const key in obj) {
      const found = extractArray(obj[key]);
      if (found.length > 0) return found;
    }
  }
  return [];
}

// ─── Normalize detection item ─────────────────────────────────────────────
function normalizeDetection(item: any): DetectionBox {
  return {
    class_name: item.class_name || item.label || item.name || 'Unknown',
    box: item.box || item.bbox || item.bounding_box || item.coordinates || [],
    confidence:
      item.confidence !== undefined
        ? item.confidence
        : item.score !== undefined
          ? item.score
          : 1,
  };
}

// ─── CoreFunctionService ───────────────────────────────────────────────────
export const CoreFunctionService = {
  /**
   * Drowsy detection - Camera tài xế (front camera)
   * POST /drowsy/detect
   * Body: { image_base64, session_id, user_id, latitude, longitude }
   */
  drowsy: (
    imageBase64: string,
    userId?: string,
    latitude?: number,
    longitude?: number,
  ) => {
    const sessionId = Math.random().toString(36).substring(2, 18) +
      Math.random().toString(36).substring(2, 18);

    return api.post<DrowsyResult>(API_URLS.drowsy, {
      image_base64: imageBase64,
      session_id: sessionId,
      user_id: userId,
      latitude,
      longitude,
    });
  },

  /**
   * Traffic sign detection - Camera hành trình (rear camera)
   * POST /sign/predict
   */
  sign: (
    imageBase64: string,
    userId?: string,
    latitude?: number,
    longitude?: number,
  ) =>
    api.post(API_URLS.sign, {
      image_base64: imageBase64,
      user_id: userId,
      latitude,
      longitude,
    }),

  /**
   * Lane detection
   * POST /lane/predict
   */
  predictLane: (
    imageBase64: string,
    userId?: string,
    latitude?: number,
    longitude?: number,
  ) =>
    api.post(API_URLS.lane, {
      image_base64: imageBase64,
      user_id: userId,
      latitude,
      longitude,
    }),

  /**
   * Object detection
   * POST /object/predict
   */
  object: (
    imageBase64: string,
    userId?: string,
    latitude?: number,
    longitude?: number,
  ) =>
    api.post(API_URLS.object, {
      image_base64: imageBase64,
      user_id: userId,
      latitude,
      longitude,
    }),
};

// ─── Parse helpers (dùng trong hook) ──────────────────────────────────────
export function parseSignResponse(res: any): DetectionBox[] {
  const raw = extractArray(res?.data);
  return raw
    .map(normalizeDetection)
    .filter(item => Array.isArray(item.box) && item.box.length === 4);
}

export function parseLaneResponse(res: any): DetectionBox[] {
  const d = res?.data?.data || res?.data || {};
  const raw = Array.isArray(d.detections)
    ? d.detections
    : Array.isArray(d.data)
      ? d.data
      : Array.isArray(d.lanes)
        ? d.lanes
        : Array.isArray(d)
          ? d
          : [];
  return raw
    .map(normalizeDetection)
    .filter((item: DetectionBox) => Array.isArray(item.box) && item.box.length === 4);
}

export function parseObjectResponse(res: any): DetectionBox[] {
  const raw = res?.data?.data?.data?.objects || [];
  return raw.map((o: any) => ({
    class_name: o.label,
    box: o.bbox,
    confidence: o.confidence,
  }));
}
