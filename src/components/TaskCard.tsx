import { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Task } from '../types/task';
import AppIcon from './AppIcon';

type Props = {
  task: Task;
  textColor: string;
  cardColor: string;
  primaryColor: string;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDetails: () => void;
};

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Estudos':
      return require('../img/open-book.png');
    case 'Saúde':
      return require('../img/heart.png');
    case 'Trabalho':
      return require('../img/briefcase.png');
    case 'Pessoal':
      return require('../img/lotus.png');
    default:
      return require('../img/check-mark.png');
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Estudos':
      return '#ee9919';
    case 'Saúde':
      return '#f34a6e';
    case 'Trabalho':
      return '#1577d3';
    case 'Pessoal':
      return '#9ed447';
    default:
      return '#f7f7f7';
  }
}

function getPriorityColor(priority: Task['priority']) {
  switch (priority) {
    case 'alta':
      return '#FF6B6B';
    case 'media':
      return '#F4B860';
    case 'baixa':
      return '#2E9E73';
    default:
      return '#999';
  }
}

function getPriorityLabel(priority: Task['priority']) {
  if (priority === 'baixa') return 'Baixa';
  if (priority === 'media') return 'Média';
  return 'Alta';
}

function getStatusLabel(status: Task['status']) {
  if (status === 'concluida') return 'Concluída';
  if (status === 'em_andamento') return 'Em andamento';
  return 'Pendente';
}

export default function TaskCard({
  task,
  textColor,
  cardColor,
  primaryColor,
  onToggle,
  onEdit,
  onDelete,
  onDetails,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isDone = task.status === 'concluida';

  function handleToggle() {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle();
  }

  const priorityColor = getPriorityColor(task.priority);

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        marginBottom: 14,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <View style={{ alignItems: 'center', width: 36 }}>
        <TouchableOpacity
          onPress={handleToggle}
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: isDone ? '#1ef742' : priorityColor,
            backgroundColor: isDone ? '#51df34' : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          {isDone && (
            <AppIcon source={require('../img/check-mark.png')} size={12} color="#fff" />
          )}
        </TouchableOpacity>

        <View
          style={{
            width: 1,
            flex: 1,
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: priorityColor,
            marginTop: 4,
            opacity: 0.7,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: priorityColor,
          borderRadius: 18,
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
          opacity: isDone ? 0.6 : 1,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <TouchableOpacity
          onPress={handleToggle}
          activeOpacity={0.85}
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.25)',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <AppIcon
            source={getCategoryIcon(task.category)}
            size={23}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggle} activeOpacity={0.85} style={{ flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 15,
              textDecorationLine: isDone ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </Text>

          <Text style={{ color: '#fff', fontSize: 12, opacity: 0.85, marginTop: 3 }}>
            {task.category} • Prioridade {getPriorityLabel(task.priority)}
          </Text>

          <Text style={{ color: '#fff', fontSize: 11, opacity: 0.8, marginTop: 2 }}>
            {getStatusLabel(task.status)}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 10, marginLeft: 8 }}>
          <TouchableOpacity onPress={onDetails}>
            <AppIcon source={require('../img/view.png')} size={16} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onEdit}>
            <AppIcon source={require('../img/pencil.png')} size={16} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            <AppIcon source={require('../img/trash.png')} size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}