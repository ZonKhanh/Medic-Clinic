import React from 'react';
import { getUserByEmail } from './user';
import useAuth from '../api/useAuth';

const UserProfile = () => {
  const { isAuthenticated, user } = useAuth();

  const fetchUserData = async () => {
    if (isAuthenticated && user) {
      try {
        const response = await getUserByEmail(user.email);
        console.log('User data:', response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={fetchUserData}>Fetch User Data</button>
        </div>
      ) : (
        <p>Please sign in to view your profile</p>
      )}
    </div>
  );
};

export default UserProfile;