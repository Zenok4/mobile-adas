import { View } from 'react-native';
import { DetectionType } from '../../../types';
import { Tag } from '../../../components/common/Tag';
import { DETECTION_CONFIG } from '../../../theme';

const FILTERS = Object.entries(DETECTION_CONFIG).map(([type, cfg]) => ({
  type: type as DetectionType,
  label: cfg.label,
  color: cfg.color,
}));

interface Props {
  active: DetectionType | null;
  onChange: (type: DetectionType | null) => void;
}

export function DetectionFilter({ active, onChange }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {FILTERS.map(f => (
        <Tag
          key={f.type}
          label={f.label}
          color={f.color}
          active={active === f.type}
          onPress={() => onChange(active === f.type ? null : f.type)}
        />
      ))}
    </View>
  );
}
