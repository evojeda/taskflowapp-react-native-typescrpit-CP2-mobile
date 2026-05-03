import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

export async function getTasks(key: string): Promise<Task[]> {
  const stored = await AsyncStorage.getItem(key);

  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    await AsyncStorage.removeItem(key);
    return [];
  }
}

export async function saveTasks(key: string, tasks: Task[]) {
  await AsyncStorage.setItem(key, JSON.stringify(tasks));
}

export async function clearTasks(key: string) {
  await AsyncStorage.removeItem(key);
}