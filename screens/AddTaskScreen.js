import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase/config';
import { createTask } from '../services/task_service';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !priority || !dueDate) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const priorityLower = priority.toLowerCase();
    if (!['low', 'medium', 'high'].includes(priorityLower)) {
      Alert.alert('Error', 'Priority must be Low, Medium, or High.');
      return;
    }

    const task = {
      title,
      description,
      priority: priorityLower,
      dueDate,
      isCompleted: false,
    };

    try {
      await createTask(task, auth.currentUser.uid);
      Alert.alert('Success', 'Task added!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while creating the task.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Task title" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline placeholder="Task description" />

      <Text style={styles.label}>Due Date</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Priority</Text>
      <TextInput
        style={styles.input}
        value={priority}
        onChangeText={setPriority}
        placeholder="Low / Medium / High"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#6366F1',
    padding: 15,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
