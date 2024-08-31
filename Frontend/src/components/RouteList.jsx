import React from "react";
import RouteItem from "./RouteItem";
import "./RouteList.css"; // Import RouteList styles

function RouteList({ routes }) {
  return (
    <div className='route-list-container'>
      {routes.map((route, index) => (
        <RouteItem key={index} route={route} />
      ))}
    </div>
  );
}

export default RouteList;
