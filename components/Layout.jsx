import React, { Fragment } from "react";
import Head from "next/head"; //componente que permite agregar algo en el head
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM - Administración de clientes</title>
      </Head>
      <div className="bg-gray-200 min-h-screen">
        <div className="flex min-h-screen">
          <SideBar />

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
