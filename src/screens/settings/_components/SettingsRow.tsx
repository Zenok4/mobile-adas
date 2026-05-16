import { Pressable, View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BaseProps {
  iconName: string;
  iconColor?: string;
  label: string;
}

interface ToggleProps extends BaseProps {
  type: 'toggle';
  value: boolean;
  onToggle: () => void;
}

interface NavProps extends BaseProps {
  type: 'nav';
  onPress: () => void;
}

interface InfoProps extends BaseProps {
  type: 'info';
  value: string;
}

type Props = ToggleProps | NavProps | InfoProps;

export function SettingsRow(props: Props) {
  const { iconName, iconColor = '#1D6FE8', label } = props;

  const content = (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <Icon name={iconName} size={20} color={iconColor} />
      <Text variant="bodyMedium" className="flex-1 text-gray-800">
        {label}
      </Text>
      {props.type === 'toggle' && (
        <Switch
          value={props.value}
          onValueChange={props.onToggle}
          color="#1D6FE8"
        />
      )}
      {props.type === 'nav' && (
        <Icon name="chevron-right" size={20} color="#9ca3af" />
      )}
      {props.type === 'info' && (
        <Text variant="bodySmall" className="text-gray-400">
          {props.value}
        </Text>
      )}
    </View>
  );

  if (props.type === 'nav') {
    return <Pressable onPress={props.onPress}>{content}</Pressable>;
  }

  return content;
}
