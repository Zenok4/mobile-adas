import { Detection, JourneySummary } from "../types/trip";

export const JOURNEY_DETAIL: {
  summary: JourneySummary;
  detections: Detection[];
} = {
  summary: {
    route: "Đà Nẵng - Huế",
    vehicle: "Toyota Camry 51A-12345",
    duration: "2h 15m",
    totalWarnings: 22,
  },
  detections: [
    {
      id: "1",
      type: "SPEED_SIGN",
      time: "08:15:23",
      message: "Nhận diện biển báo giới hạn tốc độ 60km/h",
    },
    {
      id: "2",
      type: "DROWSY",
      time: "08:22:45",
      message: "Phát hiện dấu hiệu buồn ngủ – mắt nhắm lâu",
    },
    {
      id: "3",
      type: "OBSTACLE",
      time: "08:35:10",
      message: "Phát hiện xe phía trước đang phanh gấp",
    },
    {
      id: "4",
      type: "LANE_DEVIATION",
      time: "08:41:33",
      message: "Cảnh báo xe đang lệch làn đường bên phải",
    },
  ],
};

export const JOURNEY_LIST = [
  {
    id: "1",
    date: "01",
    month: "12/2025",
    vehicle: "Toyota Camry 51A-12345",
    route: "Đà Nẵng - Huế",
    duration: "2h 15m",
    totalWarnings: 22,
    stats: {
      DROWSY: 2,
      OBSTACLE: 5,
      LANE_DEVIATION: 3,
      SPEED_SIGN: 12,
    },
  },
  {
    id: "2",
    date: "30",
    month: "11/2025",
    vehicle: "Toyota Camry 51A-12345",
    route: "Huế - Quảng Trị",
    duration: "2h 30m",
    totalWarnings: 12,
    stats: {
      OBSTACLE: 3,
      LANE_DEVIATION: 1,
      SPEED_SIGN: 8,
    },
  },
  {
    id: "3",
    date: "29",
    month: "11/2025",
    vehicle: "Honda City 43A-67890",
    route: "Đà Nẵng - Quảng Ngãi",
    duration: "2h 45m",
    totalWarnings: 31,
    stats: {
      DROWSY: 4,
      OBSTACLE: 7,
      LANE_DEVIATION: 5,
      SPEED_SIGN: 15,
    },
  },
];
