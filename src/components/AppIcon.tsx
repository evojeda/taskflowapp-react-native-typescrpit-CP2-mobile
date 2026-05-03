import { Image, ImageSourcePropType } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  size?: number;
  color?: string;
};

export default function AppIcon({ source, size = 24, color }: Props) {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        resizeMode: 'contain',
        tintColor: color, // 🔥 ESSENCIAL
      }}
    />
  );
}