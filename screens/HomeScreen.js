import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/config';
import { getTasks } from '../services/task_service';
import TaskItem from '../components/TaskItem';
import { Picker } from '@react-native-picker/picker';
import {
  format,
  isToday,
  isTomorrow,
  isThisWeek,
  parseISO,
  addDays,
} from 'date-fns';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = getTasks(auth.currentUser.uid, (tasksList) => {
      const sorted = tasksList.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );

      setTasks((prevTasks) => {
        const prevString = JSON.stringify(prevTasks);
        const newString = JSON.stringify(sorted);
        return prevString !== newString ? sorted : prevTasks;
      });
    });

    return unsubscribe;
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch =
      priorityFilter === 'All' || task.priority.toLowerCase() === priorityFilter.toLowerCase();
    const statusMatch =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.isCompleted) ||
      (statusFilter === 'Incomplete' && !task.isCompleted);
    return priorityMatch && statusMatch;
  });

  const groupTasks = () => {
    const today = [];
    const tomorrow = [];
    const thisWeek = [];

    const now = new Date();

    filteredTasks.forEach((task) => {
      const dueDate = parseISO(task.dueDate);
      if (isToday(dueDate)) {
        today.push(task);
      } else if (isTomorrow(dueDate)) {
        tomorrow.push(task);
      } else if (isThisWeek(dueDate) && dueDate > now) {
        thisWeek.push(task);
      }
    });

    return { today, tomorrow, thisWeek };
  };

  const { today, tomorrow, thisWeek } = groupTasks();

  const renderGroup = (label, data) => {
    if (!data.length) return null;
    return (
      <View style={styles.groupContainer}>
        <Text style={styles.sectionHeader}>{label}</Text>
        {data.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {format(new Date(), 'EEEE, d MMMM')}
        </Text>
        <Text style={styles.title}>My Tasks</Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Priority</Text>
          <Picker
            selectedValue={priorityFilter}
            style={styles.picker}
            onValueChange={(itemValue) => setPriorityFilter(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Status</Text>
          <Picker
            selectedValue={statusFilter}
            style={styles.picker}
            onValueChange={(itemValue) => setStatusFilter(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="Incomplete" value="Incomplete" />
          </Picker>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        ListHeaderComponent={
          <>
            {renderGroup('Today', today)}
            {renderGroup('Tomorrow', tomorrow)}
            {renderGroup('This Week', thisWeek)}
          </>
        }
        data={[]}
        renderItem={null}
        keyExtractor={() => Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fefefe',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  filters: {
    marginBottom: 12,
  },
  pickerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  pickerLabel: {
    fontSize: 13,
    color: '#444',
    marginTop: 6,
    marginBottom: 2,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 10,
    color: '#444',
  },
  groupContainer: {
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4F46E5',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  plus: {
    fontSize: 30,
    color: 'white',
  },
});
