export const DETECTION_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string; icon: string }
> = {
  drowsy: {
    label: 'Buồn ngủ',
    color: '#1D6FE8',
    bgColor: '#EEF4FF',
    icon: 'eye-outline',
  },
  obstacle: {
    label: 'Vật cản',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    icon: 'alert-circle-outline',
  },
  sign: {
    label: 'Biển báo',
    color: '#10b981',
    bgColor: '#d1fae5',
    icon: 'traffic-light',
  },
  lane: {
    label: 'Làn đường',
    color: '#ef4444',
    bgColor: '#fee2e2',
    icon: 'road-variant',
  },
};

export const COLORS = {
  primary: '#1D6FE8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};
