import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Water Management Dashboard</Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Assets')}
        style={styles.button}
      >
        Assets
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Finance')}
        style={styles.button}
      >
        Billings
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Inventory')}
        style={styles.button}
      >
        Consumables
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Panchayats')}
        style={styles.button}
      >
        Panchayats
      </Button>
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
  button: {
    marginTop: 10,
  },
});

export default DashboardScreen;