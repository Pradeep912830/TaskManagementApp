import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteTask, updateTask } from '../services/task_service';
import { auth } from '../firebase/config';

export default function TaskItem({ task }) {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;

  const handleToggleComplete = async () => {
    try {
      await updateTask(userId, task.id, { isCompleted: !task.isCompleted });
    } catch (error) {
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(userId, task.id); // ✅ Pass userId and task.id
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditTask', { task });
  };

  return (
    <TouchableOpacity
      style={[styles.taskContainer, task.isCompleted && styles.completed]}
      onLongPress={handleEdit}
    >
      <TouchableOpacity onPress={handleToggleComplete} style={styles.statusCircle}>
        <Text style={{ color: task.isCompleted ? 'green' : 'gray', fontSize: 18 }}>
          {task.isCompleted ? '✓' : '○'}
        </Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={[styles.title, task.isCompleted && styles.strikeThrough]}>
          {task.title}
        </Text>

        {task.description ? (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        ) : null}

        <View style={styles.metaRow}>
          <Text style={styles.dueDate}>
            Due: {new Date(task.dueDate).toDateString()}
          </Text>
          <View style={[styles.priorityBadge, styles[task.priority.toLowerCase()]]}>
            <Text style={styles.priorityText}>{task.priority}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
        <Text style={{ fontSize: 18 }}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  completed: {
    backgroundColor: '#f0f0f0',
  },
  statusCircle: {
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
    color: '#999',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  low: {
    backgroundColor: '#22c55e',
  },
  medium: {
    backgroundColor: '#facc15',
  },
  high: {
    backgroundColor: '#ef4444',
  },
  deleteBtn: {
    marginLeft: 10,
  },
});
