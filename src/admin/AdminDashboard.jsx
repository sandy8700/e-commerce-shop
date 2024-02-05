import React from 'react';
// import UserListing from './UserListing';
// import { firebaseApp } from "../firebase";
// import {
//     getAuth
//   } from "firebase/auth";
//  import MainLayout from '../layout/MainLayout';
import AdminLayout from './AdminLayout/Layout';

// const auth = getAuth(firebaseApp);

const AdminDashboard = () => {

    //  const user = auth.currentUser;

    // if (user !== null) {
    //     user.providerData.forEach((profile) => {
    //       console.log("Sign-in provider: " + profile.providerId);
    //       console.log("  Provider-specific UID: " + profile.uid);
    //       console.log("  Name: " + profile.displayName);
    //       console.log("  Email: " + profile.email);
    //       console.log("  Photo URL: " + profile.photoURL);
    //     });
    //   }
  return (
      <AdminLayout>
      <h1>Admin Dashboard</h1>
      {/* <UserListing></UserListing> */}
    </AdminLayout>
  );
};

export default AdminDashboard;