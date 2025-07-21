import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';

export default function TaskDetailsScreen({ route }) {
  const { task } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.textbox}
        value={task.title}
        editable={false}
        multiline
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.textbox, { height: 100 }]}
        value={task.description || 'No description provided.'}
        editable={false}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.textbox}
        value={new Date(task.dueDate).toDateString()}
        editable={false}
      />

      <Text style={styles.label}>Priority</Text>
      <TextInput
        style={[
          styles.textbox,
          styles.priorityText,
          styles[task.priority.toLowerCase()],
        ]}
        value={task.priority}
        editable={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 6,
  },
  textbox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  low: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  medium: {
    backgroundColor: '#facc15',
    borderColor: '#facc15',
  },
  high: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
});
