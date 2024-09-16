import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import CRUDScreen from './CRUDScreen';
import {
  getAssets, createAsset, updateAsset, deleteAsset,
  getBillings, createBilling, updateBilling, deleteBilling,
  getConsumables, createConsumable, updateConsumable, deleteConsumable,
  getPanchayats, createPanchayat, updatePanchayat, deletePanchayat
} from '../../services/api';

const screenWidth = Dimensions.get('window').width;

const AnalyticsButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>Toggle Analytics</Text>
  </TouchableOpacity>
);

const AnalyticsScreen = ({ data, title }) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>{title} Analytics</Text>
    <View style={styles.summaryContainer}>
      <Text style={styles.subtitle}>Summary</Text>
      <Text>Total Items: {data.length}</Text>
      <Text>Last Updated: {new Date().toLocaleDateString()}</Text>
    </View>
    <View style={styles.chartContainer}>
      <Text style={styles.subtitle}>Chart</Text>
      <BarChart
        data={{
          labels: data.map(item => item.name),
          datasets: [{
            data: data.map(item => item.value)
          }]
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  </ScrollView>
);

export const AssetsScreen = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const analyticsData = [
    { name: 'Pumps', value: 50 },
    { name: 'Pipelines', value: 200 },
    { name: 'Valves', value: 100 },
    { name: 'Plants', value: 10 },
  ];

  return (
    <View style={styles.screen}>
      <AnalyticsButton onPress={() => setShowAnalytics(!showAnalytics)} />
      {showAnalytics ? (
        <AnalyticsScreen data={analyticsData} title="Assets" />
      ) : (
        <CRUDScreen
          title="Assets"
          fetchItems={getAssets}
          createItem={createAsset}
          updateItem={updateAsset}
          deleteItem={deleteAsset}
          fields={['asset_type', 'location_latitude', 'location_longitude', 'installation_date', 'panchayat_id']}
        />
      )}
    </View>
  );
};

export const BillingsScreen = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const analyticsData = [
    { name: 'Receipts', value: 5000 },
    { name: 'Expenses', value: 4000 },
    { name: 'Outstanding', value: 1000 },
  ];

  return (
    <View style={styles.screen}>
      <AnalyticsButton onPress={() => setShowAnalytics(!showAnalytics)} />
      {showAnalytics ? (
        <AnalyticsScreen  data={analyticsData} title="Billings" setShowAnalytics={setShowAnalytics}/>
      ) : (
        <CRUDScreen
          title="Billings"
          fetchItems={getBillings}
          createItem={createBilling}
          updateItem={updateBilling}
          deleteItem={deleteBilling}
          fields={['consumer_name', 'billing_amount', 'due_date', 'payment_status', 'panchayat_id']}
        />
      )}
    </View>
  );
};

export const ConsumablesScreen = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const analyticsData = [
    { name: 'Chemicals', value: 500 },
    { name: 'Filters', value: 200 },
    { name: 'Spares', value: 300 },
  ];

  return (
    <View style={styles.screen}>
      <AnalyticsButton onPress={() => setShowAnalytics(!showAnalytics)} />
      {showAnalytics ? (
        <AnalyticsScreen data={analyticsData} title="Consumables" />
      ) : (
        <CRUDScreen
          title="Consumables"
          fetchItems={getConsumables}
          createItem={createConsumable}
          updateItem={updateConsumable}
          deleteItem={deleteConsumable}
          fields={['item_name', 'current_quantity', 'minimum_threshold', 'replenishment_due_date', 'panchayat_id']}
        />
      )}
    </View>
  );
};

export const PanchayatsScreen = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const analyticsData = [
    { name: 'Total GPs', value: 100 },
    { name: 'Active', value: 95 },
    { name: 'Inactive', value: 5 },
  ];

  return (
    <View style={styles.screen}>
      <AnalyticsButton onPress={() => setShowAnalytics(!showAnalytics)} />
      {showAnalytics ? (
        <AnalyticsScreen data={analyticsData} title="Panchayats" />
      ) : (
        <CRUDScreen
          title="Panchayats"
          fetchItems={getPanchayats}
          createItem={createPanchayat}
          updateItem={updatePanchayat}
          deleteItem={deletePanchayat}
          fields={['panchayat_name', 'district', 'state', 'contact_details']}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
});