import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal } from 'react-native';
import { TextInput, Button, Title, Snackbar, IconButton, Text, useTheme } from 'react-native-paper';
import * as authStorage from '../../services/authStorage';
import { Language } from '@/components/Language';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [languageModalVisible, setLanguageModalVisible] = useState(true);
  const { t, i18n } = useTranslation();
  const { colors } = useTheme(); // Get the current theme's colors

  useEffect(() => {
    // Show language modal on initial render
    setLanguageModalVisible(true);
  }, []);

  const handleLogin = async () => {
    // Check for the hardcoded credentials
    if (email === 'jalsync@admin.com' && password === 'jalsync') {
      setIsAuthenticated(true); // Skip the API call if credentials match
      return;
    }

    try {
      // Make your API call for login here
      const response = await login(email, password);
      await authStorage.storeToken(response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setSnackbarMessage(t('loginScreen.loginFailed'));
      setSnackbarVisible(true);
    }
  };

  const toggleLanguageModal = () => {
    setLanguageModalVisible(!languageModalVisible);
  };

  // Function to pre-fill mock admin credentials
  const fillMockAdminCredentials = () => {
    setEmail('jalsync@admin.com');
    setPassword('jalsync');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/jalsync_logo.png')} style={{ alignSelf: 'center', width: 200, height: 200 }} />
      <Text style={[styles.noteText, { color: colors.text }]}>
        Use the following credentials to login: {'\n'}
        Email: jalsync@admin.com {'\n'}
        Password: jalsync
      </Text>
      <Title style={styles.title}>{t('loginScreen.title')}</Title>
      <Title style={{ fontSize: 17, textAlign: 'center', marginBottom: 30 }}>{t('loginScreen.subtitle')}</Title>

      {/* Email Input */}
      <TextInput
        label={t('loginScreen.email')}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />

      {/* Password Input with Eye Button */}
      <View style={styles.passwordContainer}>
        <TextInput
          label={t('loginScreen.password')}
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!showPassword} // Toggle secure text entry
          style={[styles.input, { flex: 1 }]}
        />
        <IconButton
          icon={showPassword ? 'eye-off' : 'eye'} // Eye icon changes based on password visibility
          size={24}
          onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
        />
      </View>

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        {t('common.login')}
      </Button>

      {/* Button to login as mock admin */}
      <Button mode="contained" onPress={fillMockAdminCredentials} style={styles.mockAdminButton}>
        Login as Mock Admin
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Register')}>
        {t('common.register')}
      </Button>

      {/* Text advising to switch to light mode */}
      <Text style={[styles.adviceText, { color: colors.text }]}>
        {t('common.switchToLightMode')}
      </Text>

      <View style={styles.languageButtonContainer}>
        <IconButton
          icon="translate"
          size={24}
          onPress={toggleLanguageModal}
        />
        <Button mode="text" onPress={toggleLanguageModal} style={styles.languageButton}>
          {t('common.changeLanguage')}
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>

      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={toggleLanguageModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Language />
            <Button mode="contained" onPress={toggleLanguageModal} style={styles.closeButton}>
              {t('common.select')}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  noteText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  adviceText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    padding: 10,
  },
  languageButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  languageButton: {
    marginLeft: 5,
    marginTop: 10,
    borderColor: Colors.dark.background,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    borderColor: Colors.dark.background,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'solid',
  },
});

export default LoginScreen;
