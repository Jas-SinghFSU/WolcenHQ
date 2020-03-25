import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const userObject = await axios.get("/api/auth");
      setUser(userObject.data);
    } catch (error) {
      console.error("Failed to get user.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <context.Provider value={{ user, logout: handleLogout }}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;
