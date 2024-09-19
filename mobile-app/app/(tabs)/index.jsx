import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, TextInput, Button, Avatar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import {PanchayatsScreen, AssetsScreen, BillingsScreen, ConsumablesScreen} from '../screens/EntityScreen';
import MainStartScreen from '../screens/MainStartScreen';
import SecondMainStartScreen from '../screens/SecondMainScreen';
import { getToken } from '@/services/authStorage';
import './i18n';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const { t } = useTranslation();

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
      <Tab.Screen name="Dashboard" component={MainStartScreen} options={{ title: t('common.dashboard') }} />
      <Tab.Screen name="Assets" component={AssetsScreen} options={{ title: t('common.assets') }} />
      <Tab.Screen name="Inventory" component={ConsumablesScreen} options={{ title: t('common.inventory') }} />
      <Tab.Screen name="Finance" component={BillingsScreen} options={{ title: t('common.finance') }} />
      <Tab.Screen name="Panchayats" component={PanchayatsScreen} options={{ title: t('common.panchayats') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('common.profile') }} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Login">
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: t('common.register') }} />
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