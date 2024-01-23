// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full lg:w-1/4 bg-gray-100 ">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/user/profile" className="text-blue-500 hover:underline">
            Informasi Akun
          </Link>
        </li>
        <li>
          <Link
            to="/user/profile/address"
            className="text-blue-500 hover:underline"
          >
            Alamat
          </Link>
        </li>
        <li>
          <Link
            to="/user/profile/orders"
            className="text-blue-500 hover:underline"
          >
            Daftar Pesanan
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
