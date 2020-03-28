import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);

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

  // get user every 5 minutes (300,000 ms)
  let userFetchInterval = 5;
  userFetchInterval = 1000 * 60 * userFetchInterval;
  setInterval(getUser, userFetchInterval);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <context.Provider value={{ user, logout: handleLogout, getUser }}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;
