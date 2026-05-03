import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  backgroundColor: string;
};

export default function CustomButton({ title, onPress, backgroundColor }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}