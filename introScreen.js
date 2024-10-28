import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao fakeTwitter!</Text>
      <Text style={styles.subtitle}></Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.signupButton]} 
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008cff',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00417a',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: '#003366',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
