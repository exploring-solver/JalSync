import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const FinanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finance Management</Text>
      {/* Add buttons for managing finance, bill generation, payments, etc. */}
      <Button mode="contained" onPress={() => console.log('Manage Finance')}>
        Manage Finance
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default FinanceScreen;
