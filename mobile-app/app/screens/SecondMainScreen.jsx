import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, FlatList } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import MapView, { Marker } from 'react-native-maps';
import { Camera } from 'lucide-react';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const assets = [
    { id: 1, name: 'Water Pump A', location: { latitude: 20.5937, longitude: 78.9629 }, status: 'Operational' },
    { id: 2, name: 'Pipeline B', location: { latitude: 20.6037, longitude: 78.9729 }, status: 'Needs Maintenance' },
    { id: 3, name: 'Treatment Plant C', location: { latitude: 20.5837, longitude: 78.9529 }, status: 'Under Repair' },
];

const inventory = [
    { id: 1, name: 'Chlorine', quantity: 500, reorderLevel: 100 },
    { id: 2, name: 'Filters', quantity: 50, reorderLevel: 20 },
    { id: 3, name: 'Pipes', quantity: 200, reorderLevel: 50 },
];

const financials = [
    { id: 1, type: 'Income', amount: 50000, date: '2024-09-01', description: 'Monthly water charges' },
    { id: 2, type: 'Expense', amount: 20000, date: '2024-09-05', description: 'Pump maintenance' },
    { id: 3, type: 'Income', amount: 30000, date: '2024-09-10', description: 'Government grant' },
];

const bills = [
    { id: 1, consumerId: 1, amount: 500, date: '2024-09-01', status: 'Unpaid' },
    { id: 2, consumerId: 2, amount: 750, date: '2024-09-01', status: 'Paid' },
    { id: 3, consumerId: 1, amount: 600, date: '2024-09-01', status: 'Unpaid' },
];

const consumers = [
    { id: 1, name: 'John Doe', address: '123 Main St', contact: '9876543210' },
    { id: 2, name: 'Jane Smith', address: '456 Elm St', contact: '9876543211' },
    { id: 3, name: 'Bob Johnson', address: '789 Oak St', contact: '9876543212' },
];

// Login Screen
const LoginScreen = ({ setCurrentScreen, setUserRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Mock login logic
        if (username === 'gp' && password === 'password') {
            setUserRole('GP');
            setCurrentScreen('Dashboard');
        } else if (username === 'phed' && password === 'password') {
            setUserRole('PHED');
            setCurrentScreen('Dashboard');
        } else if (username === 'consumer' && password === 'password') {
            setUserRole('Consumer');
            setCurrentScreen('ConsumerDashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.title}>JalSync</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

// Dashboard Screen
const DashboardScreen = ({ setCurrentScreen, userRole }) => {
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    const data = {
        labels: ['Assets', 'Inventory', 'Finance', 'Billing'],
        datasets: [
            {
                data: [assets.length, inventory.length, financials.length, bills.length],
            },
        ],
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Dashboard ({userRole} User)</Text>
            <BarChart
                data={data}
                width={350}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
            />
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('AssetManagement')}>
                <Text style={styles.buttonText}>Asset Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('InventoryManagement')}>
                <Text style={styles.buttonText}>Inventory Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('FinancialManagement')}>
                <Text style={styles.buttonText}>Financial Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('BillingPayment')}>
                <Text style={styles.buttonText}>Billing & Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Login')}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Asset Management Screen
const AssetManagementScreen = ({ setCurrentScreen }) => {
    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Asset Management</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 20.5937,
                    longitude: 78.9629,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {assets.map((asset) => (
                    <Marker
                        key={asset.id}
                        coordinate={asset.location}
                        title={asset.name}
                        description={asset.status}
                    />
                ))}
            </MapView>
            {assets.map((asset) => (
                <View key={asset.id} style={styles.listItem}>
                    <Text>Name: {asset.name}</Text>
                    <Text>Status: {asset.status}</Text>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text style={styles.buttonText}>Update Status</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Dashboard')}>
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Inventory Management Screen
const InventoryManagementScreen = ({ setCurrentScreen }) => {
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    const data = {
        labels: inventory.map((item) => item.name),
        datasets: [
            {
                data: inventory.map((item) => item.quantity),
            },
        ],
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Inventory Management</Text>
            <BarChart
                data={data}
                width={350}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
            />
            {inventory.map((item) => (
                <View key={item.id} style={styles.listItem}>
                    <Text>Item: {item.name}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Reorder Level: {item.reorderLevel}</Text>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text style={styles.buttonText}>Update Stock</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Dashboard')}>
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Financial Management Screen
const FinancialManagementScreen = ({ setCurrentScreen }) => {
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                data: [
                    financials.filter((f) => f.type === 'Income').reduce((sum, f) => sum + f.amount, 0),
                    financials.filter((f) => f.type === 'Expense').reduce((sum, f) => sum + f.amount, 0),
                ],
            },
        ],
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Financial Management</Text>
            <PieChart
                data={[
                    { name: 'Income', population: data.datasets[0].data[0], color: 'rgba(0, 255, 0, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    { name: 'Expense', population: data.datasets[0].data[1], color: 'rgba(255, 0, 0, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                ]}
                width={350}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.chart}
            />
            {financials.map((transaction) => (
                <View key={transaction.id} style={styles.listItem}>
                    <Text>Type: {transaction.type}</Text>
                    <Text>Amount: ₹{transaction.amount}</Text>
                    <Text>Date: {transaction.date}</Text>
                    <Text>Description: {transaction.description}</Text>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Dashboard')}>
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const BillingPaymentScreen = ({ setCurrentScreen, userRole }) => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const url = "http://your-api-url.com"; // Update with your actual API URL

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        // Implement API call to fetch bills
        // For now, we'll use dummy data
        setBills([
            { id: 1, consumerId: 'C001', amount: 1000, date: '2024-09-18', status: 'Unpaid' },
            { id: 2, consumerId: 'C002', amount: 1500, date: '2024-09-17', status: 'Paid' },
        ]);
    };

    const handlePayment = async (bill) => {
        const accessToken = await AsyncStorage.getItem('access_token');

        var options = {
            description: `Bill payment for Consumer ID: ${bill.consumerId}`,
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: "rzp_test_1WhP3jEX0u7tb9", // Replace with your actual Razorpay key
            amount: bill.amount * 100, // Amount in paise
            name: 'Billing System',
            order_id: "", // Generate this from your backend
            prefill: {
                email: 'user@example.com',
                contact: '9999999999',
                name: 'User'
            },
            theme: { color: '#F37254' }
        };

        RazorpayCheckout.open(options)
            .then(async (data) => {
                try {
                    // Implement API call to update bill status
                    const response = await fetch(`${url}/update-bill-status/${bill.id}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: 'Paid', paymentId: data.razorpay_payment_id }),
                    });

                    if (response.ok) {
                        setSelectedBill(bill);
                        setCurrentScreen('OrderSuccess');
                    } else {
                        throw new Error('Failed to update bill status');
                    }
                } catch (error) {
                    console.error('Error updating bill status:', error);
                    Alert.alert('Error', 'Failed to update bill status. Please contact support.');
                }
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Error', `Payment failed: ${error.description}`);
            });
    };

    const handleUpdateStatus = async (bill) => {
        // Implement status update logic for GP role
        try {

            if (true) {
                Alert.alert('Success', 'Bill status updated successfully');
                fetchBills(); // Refresh the bills list
            } else {
                throw new Error('Failed to update bill status');
            }
        } catch (error) {
            console.error('Error updating bill status:', error);
            Alert.alert('Error', 'Failed to update bill status. Please try again.');
        }
    };

    const renderBillItem = ({ item }) => (
        <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
            <Text>Consumer ID: {item.consumerId}</Text>
            <Text>Amount: ₹{item.amount}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            {userRole === 'GP' && (
                <Button
                    bgColor={'#4CAF50'}
                    textColor={'#fff'}
                    title={'Update Status'}
                    onPress={() => handleUpdateStatus(item)}
                />
            )}
            {userRole === 'Consumer' && item.status === 'Unpaid' && (
                <Button
                    bgColor={'#2196F3'}
                    textColor={'#fff'}
                    title={'Pay Bill'}
                    onPress={() => handlePayment(item)}
                />
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Billing & Payment</Text>
                <FlatList
                    data={bills}
                    renderItem={renderBillItem}
                    keyExtractor={item => item.id.toString()}
                />
                <Button
                    bgColor={'#607D8B'}
                    textColor={'#fff'}
                    title={'Back to Dashboard'}
                    onPress={() => setCurrentScreen('Dashboard')}
                />
            </View>
        </SafeAreaView>
    );
};

const OrderSuccessScreen = ({ setCurrentScreen, billDetails }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Payment Successful!</Text>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Bill ID: {billDetails.id}</Text>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>Amount Paid: ₹{billDetails.amount}</Text>
                <Button
                    bgColor={'#4CAF50'}
                    textColor={'#fff'}
                    title={'Back to Bills'}
                    onPress={() => setCurrentScreen('BillingPayment')}
                />
            </View>
        </SafeAreaView>
    );
};

// Consumer Dashboard Screen
const ConsumerDashboardScreen = ({ setCurrentScreen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const consumer = consumers[0]; // Assuming the logged-in consumer
    const consumerBills = bills.filter((bill) => bill.consumerId === consumer.id);

    const url = "http://192.168.1.2:5000"; // Update with your API URL

    const handlePayment = async (bill) => {
        setIsLoading(true);
        try {
            const accessToken = await AsyncStorage.getItem('access_token');

            var options = {
                description: `Bill payment for ${bill.id}`,
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: "rzp_test_1WhP3jEX0u7tb9",
                amount: bill.amount * 100, // Convert to paise
                name: 'Water Bill Payment',
                order_id: "", // Replace this with an order_id created using Orders API if required
                prefill: {
                    email: 'xyz@gmail.com',
                    contact: '9999999999',
                    name: 'User 1'
                },
                theme: { color: '#F37254' }
            };

            RazorpayCheckout.open(options).then(async (data) => {
                // handle success
                Alert.alert('Success', `Payment Successful: ${data.razorpay_payment_id}`);

                // Create order after successful payment
                const order = {
                    billId: bill.id,
                    amount: bill.amount,
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    razorpay_signature: data.razorpay_signature
                };

                try {
                    const response = await axios.post(`${url}/api/payments/verify`, order, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.status === 200) {
                        console.log('Payment verified successfully:', response.data);
                        // Update the bill status or perform any other necessary actions
                    } else {
                        throw new Error('Failed to verify payment');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    Alert.alert('Error', 'Payment successful but verification failed. Please contact support.');
                }
            }).catch((error) => {
                // handle failure
                console.log(error);
                Alert.alert('Error', `Payment failed: ${error.code} | ${error.description}`);
            });
        } catch (error) {
            console.error('Error in handlePayment:', error);
            Alert.alert("Error", "Failed to initiate payment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Consumer Dashboard</Text>
            <View style={styles.listItem}>
                <Text>Name: {consumer.name}</Text>
                <Text>Address: {consumer.address}</Text>
                <Text>Contact: {consumer.contact}</Text>
            </View>
            <Text style={styles.subtitle}>Your Bills</Text>
            {consumerBills.map((bill) => (
                <View key={bill.id} style={styles.listItem}>
                    <Text>Amount: ₹{bill.amount}</Text>
                    <Text>Date: {bill.date}</Text>
                    <Text>Status: {bill.status}</Text>
                    {bill.status === 'Unpaid' && (
                        <TouchableOpacity 
                            style={[styles.smallButton, isLoading && styles.disabledButton]}
                            onPress={() => handlePayment(bill)}
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>{isLoading ? 'Processing...' : 'Pay Bill'}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Login')}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    scrollView: {
      padding: 20,
      paddingBottom: 40, // Add extra padding at the bottom for consistent spacing
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom: 20, // Add margin-bottom to login container
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 20, // Increase margin-bottom
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20, // Increase margin-bottom
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20, // Increase margin-bottom
      width: '100%',
      alignItems: 'center',
    },
    smallButton: {
      backgroundColor: '#007AFF',
      padding: 5,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 20, // Add margin-bottom
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    listItem: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20, // Increase margin-bottom
    },
    map: {
      height: 300,
      marginBottom: 20,
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
      marginBottom: 20, // Add margin-bottom
    },
  });

// Add a component for reporting water supply issues (for consumers)
const ReportIssueScreen = ({ setCurrentScreen }) => {
    const [issue, setIssue] = useState('');

    const handleSubmit = () => {
        // In a real app, this would send the issue to a server
        alert('Issue reported successfully');
        setIssue('');
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Report Water Supply Issue</Text>
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Describe the issue"
                value={issue}
                onChangeText={setIssue}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Issue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('ConsumerDashboard')}>
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Add a component for scheduling maintenance (for GP and PHED users)
const ScheduleMaintenanceScreen = ({ setCurrentScreen }) => {
    const [selectedAsset, setSelectedAsset] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [maintenanceDescription, setMaintenanceDescription] = useState('');

    const handleSubmit = () => {
        // In a real app, this would send the maintenance schedule to a server
        alert('Maintenance scheduled successfully');
        setSelectedAsset('');
        setMaintenanceDate('');
        setMaintenanceDescription('');
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Schedule Maintenance</Text>
            <Text style={styles.subtitle}>Select Asset:</Text>
            {assets.map((asset) => (
                <TouchableOpacity
                    key={asset.id}
                    style={[
                        styles.button,
                        { backgroundColor: selectedAsset === asset.id ? '#4CAF50' : '#007AFF' },
                    ]}
                    onPress={() => setSelectedAsset(asset.id)}
                >
                    <Text style={styles.buttonText}>{asset.name}</Text>
                </TouchableOpacity>
            ))}
            <TextInput
                style={styles.input}
                placeholder="Maintenance Date (YYYY-MM-DD)"
                value={maintenanceDate}
                onChangeText={setMaintenanceDate}
            />
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Maintenance Description"
                value={maintenanceDescription}
                onChangeText={setMaintenanceDescription}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Schedule Maintenance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Dashboard')}>
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Modify the main App component to include these new screens
const SecondMainScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('Login');
    const [userRole, setUserRole] = useState(null);

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Login':
                return <LoginScreen setCurrentScreen={setCurrentScreen} setUserRole={setUserRole} />;
            case 'Dashboard':
                return <DashboardScreen setCurrentScreen={setCurrentScreen} userRole={userRole} />;
            case 'AssetManagement':
                return <AssetManagementScreen setCurrentScreen={setCurrentScreen} />;
            case 'InventoryManagement':
                return <InventoryManagementScreen setCurrentScreen={setCurrentScreen} />;
            case 'FinancialManagement':
                return <FinancialManagementScreen setCurrentScreen={setCurrentScreen} />;
            case 'BillingPayment':
                return <BillingPaymentScreen setCurrentScreen={setCurrentScreen} userRole={userRole} />;
            case 'ConsumerDashboard':
                return <ConsumerDashboardScreen setCurrentScreen={setCurrentScreen} />;
            case 'ReportIssue':
                return <ReportIssueScreen setCurrentScreen={setCurrentScreen} />;
            case 'ScheduleMaintenance':
                return <ScheduleMaintenanceScreen setCurrentScreen={setCurrentScreen} />;
            case 'OrderSuccess':
                return <OrderSuccessScreen setCurrentScreen={setCurrentScreen} />;
            default:
                return <LoginScreen setCurrentScreen={setCurrentScreen} setUserRole={setUserRole} />;
        }
    };

    return (
        <View style={styles.container}>
            {renderScreen()}
        </View>
    );
};

export default SecondMainScreen;