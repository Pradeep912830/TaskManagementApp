import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.checkIcon}>✔️</Text>
      </View>
      
      <Text style={styles.title}>Get things done.</Text>
      <Text style={styles.subtitle}>Just a click away from planning your tasks.</Text>
      
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },

  iconBox: {
    backgroundColor: '#6366F1',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20
  },

  checkIcon: {
    color: 'white',
    fontSize: 40
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10
  },

  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center'
  },

  nextButton: {
    backgroundColor: '#6366F1',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width:120,
    height:55
  },

  arrow: {
    color: 'white',
    fontSize: 24,
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },

});