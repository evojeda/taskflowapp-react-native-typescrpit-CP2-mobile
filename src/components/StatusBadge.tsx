import { Text, View } from 'react-native';

type Props = {
  status: 'pendente' | 'concluida';
};

export default function StatusBadge({ status }: Props) {
  const isDone = status === 'concluida';

  return (
    <View
      style={{
        backgroundColor: isDone ? '#8BCB77' : '#FF8A8A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>
        {isDone ? 'Concluída' : 'Pendente'}
      </Text>
    </View>
  );
}