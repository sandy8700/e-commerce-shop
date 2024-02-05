import React from "react";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";

const AdminLayout = ({children}) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <main>{children}</main>
      <AdminFooter></AdminFooter>
    </>
  );
};

export default AdminLayout;
