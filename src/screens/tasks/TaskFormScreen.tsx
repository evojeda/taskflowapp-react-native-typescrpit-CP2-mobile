import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTasks } from '../../hooks/useTasks';
import { TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import { RootStackParamList } from '../../routes/types';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

type RouteProps = RouteProp<RootStackParamList, 'TaskForm'>;

function getPriorityColor(priority: TaskPriority) {
  if (priority === 'baixa') return '#2E9E73';
  if (priority === 'media') return '#F4B860';
  return '#FF6B6B';
}

export default function TaskFormScreen() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [category, setCategory] = useState('Estudos');

  const { tasks, addTask, updateTask } = useTasks();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();

  const taskId = route.params?.taskId;
  const isEditing = Boolean(taskId);

  useEffect(() => {
    if (taskId) {
      const task = tasks.find(item => item.id === taskId);

      if (task) {
        setTitle(task.title);
        setPriority(task.priority);
        setCategory(task.category);
      }
    }
  }, [taskId, tasks]);

  async function handleSave() {
    if (!title.trim()) {
      setTitleError('Informe o título da tarefa antes de salvar.');
      Alert.alert('Atenção', 'Informe o título da tarefa antes de salvar.');
      return;
    }

    setTitleError('');

    try {
      if (taskId) {
        await updateTask(taskId, title, priority, category);

        Alert.alert('Sucesso', 'Tarefa atualizada!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        await addTask(title, priority, category);

        Alert.alert('Sucesso', 'Tarefa cadastrada!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (err) {
      console.log('ERRO AO SALVAR NO FORM:', err);

      Alert.alert(
        'Erro',
        err instanceof Error
          ? err.message
          : 'Não foi possível salvar a tarefa.'
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
          {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
        </Text>

        <CustomInput
          placeholder="Digite o título da tarefa"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (titleError) setTitleError('');
          }}
          backgroundColor={colors.card}
          textColor={colors.text}
        />

        {titleError !== '' && (
          <Text style={{ color: '#FF6B6B', fontSize: 12, marginTop: -14, marginBottom: 14 }}>
            {titleError}
          </Text>
        )}

        <Text style={{ color: colors.text, fontWeight: 'bold', marginBottom: 10 }}>
          Prioridade
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          {(['baixa', 'media', 'alta'] as TaskPriority[]).map(item => {
            const isSelected = priority === item;
            const priorityColor = getPriorityColor(item);

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setPriority(item)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                  backgroundColor: isSelected ? priorityColor : colors.card,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: priorityColor,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? '#fff' : priorityColor,
                    fontWeight: 'bold',
                  }}
                >
                  {item === 'baixa' ? 'Baixa' : item === 'media' ? 'Média' : 'Alta'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={{ color: colors.text, fontWeight: 'bold', marginBottom: 10 }}>
          Categoria
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          {['Estudos', 'Saúde', 'Trabalho', 'Pessoal'].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: category === item ? colors.primary : colors.card,
              }}
            >
              <Text style={{ color: category === item ? '#fff' : colors.text, fontSize: 12 }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          title={isEditing ? 'Salvar alterações' : 'Salvar tarefa'}
          onPress={handleSave}
          backgroundColor={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
}
