import React, { useState} from 'react';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { View, Text } from 'react-native';
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
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
          style={{ marginBottom: 10 }}
        />
        <Button mode="contained" onPress={handleRegister}>
          Register
        </Button>
        <Button onPress={() => navigation.goBack()}>
          Already have an account? Login
        </Button>
      </View>
    );
  }

  export default RegisterScreen;
