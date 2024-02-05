import React, { useEffect, useState } from 'react';
import { database } from '../firebase';

const UserListing = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      const usersRef = database.ref('users');
      usersRef.on('value', (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          const userList = Object.entries(usersData).map(([userId, userData]) => ({
            userId,
            ...userData,
          }));
          setUsers(userList);
        }
      });
    };

    fetchUsers();

    return () => {
      // Unsubscribe from the database when the component unmounts
      database.ref('users').off();
    };
  }, []);

  return (
    <div>
      <h1>User Listing</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            <strong>Email:</strong> {user.email}
            {/* Add other user profile information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListing;
