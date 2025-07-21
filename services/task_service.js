// services/task_service.js

import { database } from '../firebase/config';
import { ref, push, remove, update, onValue, set } from 'firebase/database';

// Returns a user-specific tasks reference path in Firebase
const getUserTasksRef = (userId) => ref(database, `tasks/${userId}`);

// Create a new task in the database
export const createTask = async (task, userId) => {
  const userRef = getUserTasksRef(userId);
  const taskRef = push(userRef);
  await set(taskRef, {
    ...task,
    createdAt: new Date().toISOString(),
    userId,
  });
};

// Get tasks for a specific user and listen for changes
export const getTasks = (userId, callback) => {
  const userRef = getUserTasksRef(userId);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    const tasks = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    callback(tasks);
  });
};

// ✅ Fixed: Delete a specific task (userId, taskId)
export const deleteTask = async (userId, taskId) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    await remove(taskRef);
    console.log(`Deleted task ${taskId}`);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

// Update a specific task
export const updateTask = async (userId, taskId, updatedTask) => {
  const taskRef = ref(database, `tasks/${userId}/${taskId}`);
  await update(taskRef, updatedTask);
};
