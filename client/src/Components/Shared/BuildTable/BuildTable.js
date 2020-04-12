import React, { useState, Fragment } from "react";
import ListHeader from "./ListHeader/ListHeader";
import ListBody from "./ListBody/ListBody";

import "./style.css";

const BuildTable = (props) => {
  const { builds } = props;

  const [backups, setBackups] = useState(null);

  return (
    <div>
      {builds && Array.isArray(builds.builds) ? (
        <Fragment>
          <ListHeader />
          {builds.builds.map((build) => {
            return <ListBody key={build._id} build={build} />;
          })}
        </Fragment>
      ) : (
        <div className="emptyBuildsMessageContainer">
          <span>No builds found :(</span>
        </div>
      )}
    </div>
  );
};

export default BuildTable;
