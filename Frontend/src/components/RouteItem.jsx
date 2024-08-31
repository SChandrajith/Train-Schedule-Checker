import React from "react";
import "./RouteItem.css"; // Import RouteItem styles

function RouteItem({ route }) {
  if (!route || !route.trainId) {
    return <div className='route-item no-data'>🚫 No data available</div>;
  }

  return (
    <div className='route-item'>
      <div className='route-header'>
        <h2 className='train-id'>🚂 Train ID: {route.trainId}</h2>
        <span className='timestamp'>
          ⏰ {new Date(route.timestamp).toLocaleString()}
        </span>
      </div>
      <div className='route-body'>
        <p className='location'>
          📍 <span className='label'>Latitude:</span> {route.latitude}
        </p>
        <p className='location'>
          📍 <span className='label'>Longitude:</span> {route.longitude}
        </p>
      </div>
    </div>
  );
}

export default RouteItem;
