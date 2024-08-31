import React from "react";

function RouteItem({ route }) {
  if (!route || !route.trainId) {
    return <div>No data available</div>;
  }

  return (
    <div className='route-item'>
      <h2>Train ID: {route.trainId}</h2>
      <p>
        Latest Location: {route.latitude}, {route.longitude} <br />
        Timestamp: {new Date(route.timestamp).toLocaleString()}
      </p>
    </div>
  );
}

export default RouteItem;
