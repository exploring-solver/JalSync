import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, TextInput, Button, Avatar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// import AssetsScreen from '../screens/AssetsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
// import InventoryScreen from '../screens/InventoryScreen';
// import FinanceScreen from '../screens/FinanceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import {PanchayatsScreen,AssetsScreen, BillingsScreen, ConsumablesScreen} from '../screens/EntityScreen';
import { getToken } from '@/services/authStorage';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Assets') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Finance') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Panchayats') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Assets" component={AssetsScreen} />
      <Tab.Screen name="Inventory" component={ConsumablesScreen} />
      <Tab.Screen name="Finance" component={BillingsScreen} />
      <Tab.Screen name="Panchayats" component={PanchayatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(getToken());
  return (
    <Stack.Navigator initialRouteName="Login">
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    // Add your custom fonts here if needed
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}