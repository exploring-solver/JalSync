import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { getUserProfile } from '../../services/api';  // Import the function from api.js
import { removeToken } from '@/services/authStorage';
import { Language } from '@/components/Language';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);   // State to store profile data
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();  // Call the API function to get profile
        setProfile(response.data);               // Set the fetched data to the profile state
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error(err);
      } finally {
        setLoading(false);                       // Set loading to false after the request completes
      }
    };
    
    fetchProfile();  // Call the fetchProfile function
  }, []);

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show error message if fetching data failed
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
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
      <Button style={styles.button} mode="contained" onPress={() => removeToken()}>
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
  },
  button: {
    marginTop: 20,
  },
});

export default ProfileScreen;
