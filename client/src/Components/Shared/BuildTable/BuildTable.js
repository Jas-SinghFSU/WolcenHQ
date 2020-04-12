import React, { useState, Fragment } from "react";
import ListHeader from "./ListHeader/ListHeader";
import ListBody from "./ListBody/ListBody";

import "./style.css";

const BuildTable = (props) => {
  const { builds, getUserData } = props;

  const [backups, setBackups] = useState(null);

  if (!builds) {
    return <Fragment></Fragment>;
  }

  return (
    <div>
      {builds.builds.length > 0 ? (
        <Fragment>
          <ListHeader />
          {builds.builds.map((build) => {
            return (
              <ListBody
                key={build._id}
                build={build}
                getUserData={getUserData}
              />
            );
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
