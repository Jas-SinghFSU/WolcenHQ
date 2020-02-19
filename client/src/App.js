import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideNavigation from "./Components/Global/Navbar/SideNavigation";
import PageContent from "./Components/Global/PageContent/PageContent";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="contentContainer">
          <SideNavigation />
          <PageContent />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
