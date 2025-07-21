import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateTask } from '../services/task_service';
import { auth } from '../firebase/config';

export default function EditTaskScreen({ route, navigation }) {
    const { task } = route.params;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(new Date(task.dueDate));
    const [priority, setPriority] = useState(task.priority);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleUpdate = async () => {
        if (!title || !dueDate) {
            Alert.alert('Validation', 'Title and due date are required.');
            return;
        }

        try {
            await updateTask(auth.currentUser.uid, task.id, {
                title,
                description,
                dueDate: dueDate.toISOString(),
                priority,
                isCompleted: task.isCompleted,
            });

            navigation.goBack();
        } catch (error) {
            Alert.alert('Update Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Enter title"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                placeholder="Enter description"
                multiline
            />

            <Text style={styles.label}>Due Date</Text>
            <Button
                title={dueDate.toDateString()}
                onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(Platform.OS === 'ios'); // keep it open on iOS
                        if (selectedDate) {
                            setDueDate(selectedDate);
                        }
                    }}
                />
            )}

            <Text style={styles.label}>Priority</Text>
            <Picker
                selectedValue={priority}
                onValueChange={(itemValue) => setPriority(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Low" value="low" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="High" value="high" />
            </Picker>

            <View style={styles.button}>
                <Button title="Update Task" onPress={handleUpdate} color="#4F46E5" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },
    picker: {
        marginTop: 6,
        marginBottom: 20,
    },
    button: {
        marginTop: 30,
    },
});
