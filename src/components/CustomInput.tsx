import { TextInput } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  backgroundColor: string;
  textColor: string;
};

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  backgroundColor,
  textColor,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      style={{
        backgroundColor,
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        color: textColor,
      }}
    />
  );
}