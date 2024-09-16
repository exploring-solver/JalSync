import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const AssetsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assets Management</Text>
      {/* Add buttons for functionalities like managing assets, adding new assets, etc. */}
      <Button mode="contained" onPress={() => console.log('Manage Assets')}>
        Manage Assets
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

export default AssetsScreen;
