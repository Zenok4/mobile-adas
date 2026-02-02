import { AlertType } from "../types/trip";

export const ALERT_CONFIG: Record<
  AlertType,
  {
    label: string;
    icon: string;
    color: string;
    bgColor: string;
  }
> = {
  safe: {
    label: 'Biển báo',
    icon: 'traffic-light',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  warning: {
    label: 'Buồn ngủ',
    icon: 'sleep',
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  danger: {
    label: 'Vật cản',
    icon: 'alert',
    color: '#ef4444',
    bgColor: '#fee2e2',
  },
  info: {
    label: 'Làn đường',
    icon: 'road-variant',
    color: '#3b82f6',
    bgColor: '#dbeafe',
  },
};