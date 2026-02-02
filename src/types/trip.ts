export type DetectionType =
  | "SPEED_SIGN"
  | "DROWSY"
  | "OBSTACLE"
  | "LANE_DEVIATION";

export interface Detection {
  id: string;
  type: DetectionType;
  time: string;
  message: string;
}

export interface JourneySummary {
  route: string;
  vehicle: string;
  duration: string;
  totalWarnings: number;
}
