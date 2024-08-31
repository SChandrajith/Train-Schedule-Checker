import React from "react";
import RouteItem from "./RouteItem";

function RouteList({ routes }) {
  return (
    <div>
      {routes.map((route, index) => (
        <RouteItem key={index} route={route} />
      ))}
    </div>
  );
}

export default RouteList;
