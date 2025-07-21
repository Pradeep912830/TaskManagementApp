import { database } from '../firebase/config';
import { ref, push, remove, update, onValue, set } from 'firebase/database';

const getUserTasksRef = (userId) => ref(database, `tasks/${userId}`);

export const createTask = async (task, userId) => {
  const userRef = getUserTasksRef(userId);
  const taskRef = push(userRef);
  await set(taskRef, {
    ...task,
    createdAt: new Date().toISOString(),
    userId,
  });
};

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

export const deleteTask = async (taskId, userId) => {
  const taskRef = ref(database, `tasks/${userId}/${taskId}`);
  await remove(taskRef);
};

export const updateTask = async (userId, taskId, updatedTask) => {
  const taskRef = ref(database, `tasks/${userId}/${taskId}`);
  await update(taskRef, updatedTask);
};
