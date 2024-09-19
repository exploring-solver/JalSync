import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal } from 'react-native';
import { TextInput, Button, Title, Snackbar, IconButton } from 'react-native-paper';
import { login } from '../../services/api';
import * as authStorage from '../../services/authStorage';
import { Language } from '@/components/Language';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [languageModalVisible, setLanguageModalVisible] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Show language modal on initial render
    setLanguageModalVisible(true);
  }, []);

  const handleLogin = async () => {
    try {
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

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/jalsync_logo.png')} style={{ alignSelf: 'center', width: 200, height: 200 }} />
      <Title style={styles.title}>{t('loginScreen.title')}</Title>
      <Title style={{ fontSize: 17, textAlign: 'center', marginBottom: 30 }}>{t('loginScreen.subtitle')}</Title>
      <TextInput
        label={t('loginScreen.email')}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label={t('loginScreen.password')}
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        {t('common.login')}
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Register')}>
        {t('common.register')}
      </Button>
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
  languageButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  languageButton: {
    marginLeft: 5,
    marginTop:10,
    borderColor: Colors.dark.background,
    borderWidth: 2,      // Adds a 2px wide border
    borderRadius: 10,    // Optional, gives rounded corners
    borderStyle: 'solid', // Optional, can be 'solid', 'dashed', or 'dotted'
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
    borderWidth: 2,      // Adds a 2px wide border
    borderRadius: 10,    // Optional, gives rounded corners
    borderStyle: 'solid', // Optional, can be 'solid', 'dashed', or 'dotted'
},

});

export default LoginScreen;