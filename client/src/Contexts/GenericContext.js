import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const context = createContext(null);

const GenericContext = ({ children }) => {
  const history = useHistory();
  const [sidebarWidth, setSidebarWidth] = useState(240);

  return (
    <context.Provider value={{ sidebarWidth, setSidebarWidth }}>
      {children}
    </context.Provider>
  );
};

GenericContext.context = context;

export default GenericContext;
