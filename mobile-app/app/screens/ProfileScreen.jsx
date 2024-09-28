import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { getUserProfile } from '../../services/api';  // Import the function from api.js
import { removeToken } from '@/services/authStorage';
import { Language } from '@/components/Language';

const ProfileScreen = ({ navigation, setIsAuthenticated }) => {
  const [profile, setProfile] = useState(null);   // State to store profile data
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Set a timeout to handle backend response delay
        const timeoutId = setTimeout(() => {
          setError('Backend took too long to respond');
          setLoading(false);
        }, 10000);  // Timeout set to 10 seconds

        const response = await getUserProfile();  // Call the API function to get profile
        clearTimeout(timeoutId);                  // Clear the timeout if response is received in time
        setProfile(response.data);               // Set the fetched data to the profile state
      } catch (err) {
        setError('Failed to fetch profile data, reload the app to login with backend.');
        console.error(err);
      } finally {
        setLoading(false);                       // Set loading to false after the request completes
      }
    };

    fetchProfile();  // Call the fetchProfile function
  }, []);

  // Logout handler to remove token and reset authentication state
  const handleLogout = async () => {
    await removeToken();
    setIsAuthenticated(false);  // Reset authentication state
    navigation.navigate('Login'); // Navigate back to the login screen
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show error message if fetching data failed or if the backend took too long
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.credentials}>
          Login with: amansharma12607@gmail.com
          {'\n'}
          Password: aman
        </Text>
        {/* <Button style={styles.button} mode="contained" onPress={handleLogout}> */}
          {/* Logout
        </Button> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {profile ? (
        <View style={styles.profileDetails}>
          <Text style={styles.profileText}>Name: {profile.name}</Text>
          <Text style={styles.profileText}>Email: {profile.email}</Text>
          {/* Add more fields from the profile data if needed */}
        </View>
      ) : (
        <Text style={styles.error}>No profile data found</Text>
      )}

      {/* Button to edit the profile */}
      <Button style={styles.button} mode="contained" onPress={() => console.log('Edit Profile')}>
        Edit Profile
      </Button>
      <Button style={styles.button} mode="contained" onPress={handleLogout}>
        Logout
      </Button>
      <Language/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileDetails: {
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  credentials: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfileScreen;
