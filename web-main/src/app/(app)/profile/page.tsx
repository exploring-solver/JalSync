"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ensure proper import for useRouter in app directory
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Import the router from next/navigation

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
        if (!token) {
          router.push('/login'); // Redirect to login if not authenticated
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get<UserProfile>('http://localhost:5000/api/users/profile', config);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile. Please try again.');
        setLoading(false);
      }
    };

    // Ensure that this runs only on the client side
    if (typeof window !== 'undefined') {
      fetchProfile();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken'); // Also remove token
    router.push('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {profile && (
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <p className="mb-2">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="mb-2">
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </p>
          <p className="mb-4">
            <strong>Address:</strong> {profile.address}
          </p>
          <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
