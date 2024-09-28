import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown
import { register } from '../../services/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // State for role
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register({ name, email, password, role });
      setSnackbarMessage('Registration successful. Please login.');
      setSnackbarVisible(true);
      setTimeout(() => navigation.navigate('Login'), 3000);
    } catch (error) {
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Superuser" value="superuser" />
      </Picker>
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        Back to Login
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default RegisterScreen;
