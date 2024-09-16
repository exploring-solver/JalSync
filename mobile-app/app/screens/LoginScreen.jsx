import React, { useState } from 'react';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

const VALID_CREDENTIALS = {
    admin: { email: 'admin@jalsync.com', password: 'admin123' },
    user: { email: 'user@jalsync.com', password: 'user123' }
};

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('user');

    const handleLogin = () => {
        if (
            (role === 'admin' && email === VALID_CREDENTIALS.admin.email && password === VALID_CREDENTIALS.admin.password) ||
            (role === 'user' && email === VALID_CREDENTIALS.user.email && password === VALID_CREDENTIALS.user.password)
        ) {
            navigation.replace('Dashboard');
        } else {
            alert('Invalid credentials');
        }
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
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                    <View style={styles.roleButtonContainer}>
                        <Button mode="contained" onPress={() => setRole('admin')} style={[styles.roleButton, role === 'admin' && styles.activeRoleButton]}>
                            Admin
                        </Button>
                        <Button mode="contained" onPress={() => setRole('user')} style={[styles.roleButton, role === 'user' && styles.activeRoleButton]}>
                            User
                        </Button>
                    </View>
                    <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
                        Login
                    </Button>
                    <Button onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
                        Don't have an account? Register
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        marginBottom: 40,
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

export default LoginScreen;