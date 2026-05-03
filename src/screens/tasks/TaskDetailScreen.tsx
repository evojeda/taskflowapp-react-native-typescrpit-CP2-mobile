import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteProps = RouteProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { tasks } = useTasks();
  const { colors } = useTheme();

  const task = tasks.find(item => item.id === route.params.taskId);

  if (!task) {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={{ padding: 20 }}>
            <Text style={{ color: colors.text }}>Tarefa não encontrada.</Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ padding: 20 }}>
          <View style={{ backgroundColor: colors.card, padding: 18, borderRadius: 16 }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 12,
              }}
            >
              {task.title}
            </Text>

            <Text style={{ color: colors.text }}>Status: {task.status}</Text>
            <Text style={{ color: colors.text }}>Prioridade: {task.priority}</Text>
            <Text style={{ color: colors.text }}>Categoria: {task.category}</Text>
            <Text style={{ color: colors.text }}>Criada em: {task.createdAt}</Text>
            <Text style={{ color: colors.text }}>Atualizada em: {task.updatedAt}</Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}