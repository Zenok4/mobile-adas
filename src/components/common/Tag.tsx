import { View } from 'react-native';
import { Chip } from 'react-native-paper';

interface TagProps {
  label: string;
  color?: string;
  bgColor?: string;
  icon?: string;
  onClose?: () => void;
}

export function Tag({ label, color = '#1D6FE8', bgColor = '#EEF4FF', onClose }: TagProps) {
  return (
    <Chip
      mode="outlined"
      onClose={onClose}
      style={{ backgroundColor: bgColor, borderColor: color }}
      textStyle={{ color, fontSize: 11, fontWeight: '600' }}>
      {label}
    </Chip>
  );
}
