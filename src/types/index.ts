export type DetectionType =
  | 'SPEED_SIGN'
  | 'DROWSY'
  | 'OBSTACLE'
  | 'LANE_DEVIATION';

export interface Detection {
  id: string;
  type: DetectionType;
  time: string;
  message: string;
}

export interface TripSummary {
  route: string;
  vehicle: string;
  duration: string;
  totalWarnings: number;
}

export interface TripDetail {
  id: string;
  summary: TripSummary;
  detections: Detection[];
  startTime?: string;
  endTime?: string;
  distance?: number;
  avgSpeed?: number;
}

export interface TripListItem {
  id: string;
  date: string;
  month: string;
  vehicle: string;
  route: string;
  duration: string;
  totalWarnings: number;
  stats: {
    drowsy?: number;
    obstacle?: number;
    sign?: number;
    lane?: number;
    [key: string]: number | undefined;
  };
}

export interface AdasFeatures {
  sleepAlert: boolean;
  objectDetect: boolean;
  signDetect: boolean;
  laneMonitor: boolean;
}
