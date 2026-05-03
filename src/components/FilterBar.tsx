import { View, TouchableOpacity, Text } from 'react-native';

export type FilterType = 'todas' | 'pendente' | 'concluida';

type Colors = {
  primary: string;
  card: string;
  text: string;
};

type Props = {
  selected: FilterType;
  onChange: (value: FilterType) => void;
  colors: Colors;
};

export default function FilterBar({ selected, onChange, colors }: Props) {
  const options: FilterType[] = ['todas', 'pendente', 'concluida'];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.card,
        padding: 6,
        borderRadius: 18,
        marginBottom: 16,
      }}
    >
      {options.map(item => {
        const isSelected = selected === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => onChange(item)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 14,
              alignItems: 'center',
              backgroundColor: isSelected ? colors.primary : 'transparent',
            }}
          >
            <Text
              style={{
                color: isSelected ? '#fff' : colors.text,
                fontWeight: isSelected ? 'bold' : '500',
                fontSize: 12,
              }}
            >
              {item === 'todas'
                ? 'Todas'
                : item === 'pendente'
                ? 'Pendentes'
                : 'Concluídas'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}