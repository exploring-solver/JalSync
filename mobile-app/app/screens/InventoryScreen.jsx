import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const InventoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Management</Text>
      {/* Add buttons for inventory management functionalities */}
      <Button mode="contained" onPress={() => console.log('Manage Inventory')}>
        Manage Inventory
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

export default InventoryScreen;
