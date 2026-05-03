import { View, Text } from 'react-native';

type Props = {
  textColor: string;
};

export default function EmptyState({ textColor }: Props) {
  return (
    <View style={{ marginTop: 50, alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', color: textColor, fontWeight: 'bold' }}>
        ✨ Nenhuma tarefa cadastrada ainda.
      </Text>
      <Text style={{ textAlign: 'center', color: textColor, fontSize: 12, marginTop: 6 }}>
        Clique no botão + para criar sua primeira tarefa.
      </Text>
    </View>
  );
}