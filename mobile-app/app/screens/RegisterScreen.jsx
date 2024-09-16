import React, { useState } from 'react';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Image, StyleSheet, Platform } from 'react-native';
function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // In a real app, you would handle registration here
    alert('Registration functionality not implemented in this demo');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo-jalsync.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formContainer}>
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
          secureTextEntry={!showPassword}
          mode="outlined"
          right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleRegister}>
          Register
        </Button>
        <Button onPress={() => navigation.goBack()}>
          Already have an account? Login
        </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
  },
  logoContainer: {
      alignItems: 'center',
  },
  logo: {
      width: 150,
      height: 150,
  },
  formContainer: {
      paddingHorizontal: 20,
  },
  input: {
      marginBottom: 15,
  },
  roleButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
  },
  roleButton: {
      flex: 1,
      marginHorizontal: 5,
  },
  activeRoleButton: {
      backgroundColor: '#007AFF',
  },
  loginButton: {
      marginBottom: 15,
      paddingVertical: 8,
  },
  registerButton: {
      marginTop: 10,
  },
});

export default RegisterScreen;
