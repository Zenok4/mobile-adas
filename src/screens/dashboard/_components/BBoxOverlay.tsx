// src/screens/dashboard/_components/BBoxOverlay.tsx
// Render bounding boxes từ AI detection lên camera preview
// API trả về box: [x1, y1, x2, y2] theo tọa độ ảnh gốc
// Component này scale về kích thước preview thực tế

import { View, StyleSheet, Text } from 'react-native';

export interface Detection {
  box: [number, number, number, number]; // [x1, y1, x2, y2]
  class_name: string;
  confidence: number;
  class_id?: number;
}

interface Props {
  detections: Detection[];
  /** Kích thước ảnh gốc mà AI xử lý (từ takePhoto) */
  imageWidth: number;
  imageHeight: number;
  /** Kích thước vùng preview trên màn hình */
  previewWidth: number;
  previewHeight: number;
  /** Màu bbox, mặc định vàng cho sign, xanh cho object */
  color?: string;
}

const COLORS = [
  '#f59e0b', // vàng
  '#3b82f6', // xanh dương
  '#10b981', // xanh lá
  '#ef4444', // đỏ
  '#8b5cf6', // tím
  '#ec4899', // hồng
];

function getColor(classId: number | undefined, index: number): string {
  if (classId !== undefined) return COLORS[classId % COLORS.length];
  return COLORS[index % COLORS.length];
}

export function BBoxOverlay({
  detections,
  imageWidth,
  imageHeight,
  previewWidth,
  previewHeight,
  color,
}: Props) {
  if (!detections || detections.length === 0) return null;

  // Camera preview dùng objectFit="cover" nên cần tính toán
  // phần ảnh thực tế được hiển thị (letterbox/pillarbox)
  const imageAspect = imageWidth / imageHeight;
  const previewAspect = previewWidth / previewHeight;

  let scaleX: number;
  let scaleY: number;
  let offsetX = 0;
  let offsetY = 0;

  if (imageAspect > previewAspect) {
    // ảnh rộng hơn preview → crop 2 bên (pillarbox)
    scaleY = previewHeight / imageHeight;
    scaleX = scaleY;
    offsetX = (previewWidth - imageWidth * scaleX) / 2;
  } else {
    // ảnh cao hơn preview → crop trên dưới (letterbox)
    scaleX = previewWidth / imageWidth;
    scaleY = scaleX;
    offsetY = (previewHeight - imageHeight * scaleY) / 2;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {detections.map((det, index) => {
        const [x1, y1, x2, y2] = det.box;
        const bboxColor = color ?? getColor(det.class_id, index);

        const left   = x1 * scaleX + offsetX;
        const top    = y1 * scaleY + offsetY;
        const width  = (x2 - x1) * scaleX;
        const height = (y2 - y1) * scaleY;

        // Bỏ qua box quá nhỏ hoặc ra ngoài preview
        if (width < 5 || height < 5) return null;
        if (left + width < 0 || top + height < 0) return null;
        if (left > previewWidth || top > previewHeight) return null;

        const pct = Math.round(det.confidence * 100);
        const label = `${det.class_name} ${pct}%`;

        return (
          <View
            key={`${det.class_id}-${index}`}
            style={[
              styles.box,
              {
                left,
                top,
                width,
                height,
                borderColor: bboxColor,
              },
            ]}>
            {/* Label trên góc trái bbox */}
            <View
              style={[
                styles.labelBg,
                { backgroundColor: bboxColor },
              ]}>
              <Text
                style={styles.labelText}
                numberOfLines={1}>
                {label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
  },

  labelBg: {
    position: 'absolute',
    top: -20,
    left: -2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    maxWidth: 200,
  },

  labelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
});
