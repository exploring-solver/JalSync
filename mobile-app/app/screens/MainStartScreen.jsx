import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit'; // For charting
import { Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser'; // For opening the PDF in a browser

const MainStartScreen = ({setCurrentScreen}) => {
  const [consumerData, setConsumerData] = useState([
    { id: '1', name: 'Consumer A', billAmount: 300, status: 'Paid' },
    { id: '2', name: 'Consumer B', billAmount: 500, status: 'Unpaid' },
  ]);
  
  const [inventory, setInventory] = useState([
    { id: '1', itemName: 'Filter', quantity: 5 },
    { id: '2', itemName: 'Chemical', quantity: 10 },
  ]);
  
  const [assets, setAssets] = useState([
    { id: '1', name: 'Pump', status: 'Operational', maintenanceDue: '2024-12-01' },
    { id: '2', name: 'Pipeline', status: 'Needs Repair', maintenanceDue: '2024-10-15' },
  ]);

  const chartData = [
    { name: 'Operational', population: 60, color: '#00FF00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Needs Repair', population: 40, color: '#FF0000', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  // Function to handle report generation by opening the PDF link
  const handleGenerateReport = async () => {
    const pdfUrl = 'https://trustscript-rust.vercel.app/report.pdf';
    
    try {
      // Open the PDF link in the browser
      await WebBrowser.openBrowserAsync(pdfUrl);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Dashboard and Graphs */}
      <Button title="Logout" onPress={() => {setCurrentScreen('Login')}} />
      <Text style={styles.title}>Dashboard Overview</Text>
      <Text>Total Assets: {assets.length}</Text>
      <Text>Total Consumers: {consumerData.length}</Text>

      {/* Pie Chart for Asset Status */}
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      {/* GIS Asset Management */}
      <Text style={styles.title}>GIS Mapping & Asset Management</Text>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Asset: {item.name}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Maintenance Due: {item.maintenanceDue}</Text>
            <Button title="View on Map" onPress={() => {}} />
          </View>
        )}
      />

      {/* Inventory Management */}
      <Text style={styles.title}>Inventory Management</Text>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Item: {item.itemName}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Button title="Order More" onPress={() => {}} />
          </View>
        )}
      />

      {/* Financial Management */}
      <Text style={styles.title}>Financial Management</Text>
      <TextInput placeholder="Enter Income" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Enter Expense" style={styles.input} keyboardType="numeric" />
      <Button title="Add Transaction" onPress={() => {}} />

      {/* Billing & Payment */}
      <Text style={styles.title}>Billing & Payment</Text>
      <FlatList
        data={consumerData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Consumer: {item.name}</Text>
            <Text>Bill Amount: {item.billAmount}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Pay Bill" onPress={() => {}} disabled={item.status === 'Paid'} />
          </View>
        )}
      />

      {/* Reporting */}
      <Text style={styles.title}>Reports and Metrics</Text>
      <Button title="Generate Report" onPress={handleGenerateReport} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
    paddingBottom: 16, // Ensure padding at the bottom for the button
    marginBottom: 20, // Remove margin to avoid clipping
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});

export default MainStartScreen;
