import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCOYsPPd99QuEDKKsJQhxxj3VUNvajEPwY',
  authDomain: 'react-native-project-1d7e6.firebaseapp.com',
  databaseURL: 'https://react-native-project-1d7e6-default-rtdb.firebaseio.com',
  projectId: 'react-native-project-1d7e6',
  storageBucket: 'react-native-project-1d7e6.appspot.com',
  messagingSenderId: '581751275927',
  appId: '1:581751275927:android:2510be8aec4652270d04d2',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const database = getDatabase(app);
