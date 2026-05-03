import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/types';
import EmptyState from '../../components/EmptyState';
import TaskCard from '../../components/TaskCard';
import FilterBar from '../../components/FilterBar';
import { FilterType } from '../../components/FilterBar';
import AppIcon from '../../components/AppIcon';
import Header from '../../components/Header';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'TaskList'>;

export default function TaskListScreen() {
  const { tasks, removeTask, toggleTask, loading, error } = useTasks();
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProps>();

  const [filter, setFilter] = useState<FilterType>('todas');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'todas') return true;
    return task.status === filter;
  });

  function handleDelete(id: string) {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?');
      if (confirmDelete) removeTask(id);
      return;
    }

    Alert.alert('Excluir tarefa', 'Tem certeza que deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeTask(id) },
    ]);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>Carregando tarefas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <View style={{ flex: 1, padding: 10 }}>
        <FilterBar selected={filter} onChange={setFilter} colors={colors} />

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyState textColor={colors.text} />}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              textColor={colors.text}
              cardColor={colors.card}
              primaryColor={colors.primary}
              onToggle={() => toggleTask(item.id)}
              onEdit={() => navigation.navigate('TaskForm', { taskId: item.id })}
              onDetails={() => navigation.navigate('TaskDetail', { taskId: item.id })}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('TaskForm')}
          style={{
            position: 'absolute',
            right: 20,
            bottom: 25,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppIcon source={require('../../img/plus.png')} size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}