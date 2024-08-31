import React, { useState, useEffect } from "react";
import RouteList from "./components/RouteList";

function App() {
  const [routes, setRoutes] = useState([]);
  const trainIds = [
    "train1",
    "train2",
    "train3",
    "train4",
    "train5",
    "train6",
    "train7",
    "train8",
    "train9",
    "train10",
  ];

  useEffect(() => {
    const fetchRoutes = async () => {
      const fetchedRoutes = [];
      for (const trainId of trainIds) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/train-locations/${trainId}/latest`
          );
          const data = await response.json();
          fetchedRoutes.push(data);
        } catch (error) {
          console.error(`Error fetching data for ${trainId}:`, error);
        }
      }
      setRoutes(fetchedRoutes);
    };

    // Polling every 5 seconds
    const intervalId = setInterval(fetchRoutes, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='App'>
      <h1>Train Routes</h1>
      <RouteList routes={routes} />
    </div>
  );
}

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [idInput, setIdInput] = useState("");
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8080");

//     ws.onopen = () => {
//       console.log("Connected to WebSocket server");
//       const message = JSON.stringify({
//         type: "fetch-data",
//         trainId: "train1",
//       });
//       ws.send(message);
//     };

//     ws.onmessage = (event) => {
//       setMessages((prev) => [...prev, event.data]);
//     };

//     ws.onclose = () => {
//       console.log("Disconnected from WebSocket server");
//     };

//     setSocket(ws);

//     // fetchData();
//     // console.log(messages);
//     return () => ws.close();
//   }, []);
//   // const fetchData = () => {
//   //   if (socket && idInput) {
//   //     const message = JSON.stringify({
//   //       type: "fetch-data",
//   //       trainId: "train1",
//   //     });
//   //     socket.send(message);
//   //   }
//   // };
//   return (
//     <div>
//       <h1>WebSocket Client</h1>
//       <input
//         type='text'
//         value={idInput}
//         onChange={(e) => setIdInput(e.target.value)}
//         placeholder='Enter ID'
//       />
//       {/* <button onClick={fetchData}>Fetch Data from API</button> */}
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
