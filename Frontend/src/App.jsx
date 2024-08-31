import React, { useState, useEffect } from "react";
import RouteList from "./components/RouteList";

function App() {
  const [routes, setRoutes] = useState([]);
  const [messages, setMessages] = useState([]);

  const [idInput, setIdInput] = useState("");
  const [socket, setSocket] = useState(null);
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
    const ws = new WebSocket("ws://localhost:8080");
    const fetchedRoutes = [];
    ws.onopen = () => {
      console.log("Connected to WebSocket server");

      trainIds.forEach((id) => {
        const message = JSON.stringify({
          type: "fetch-data",
          trainId: id,
        });
        ws.send(message);
      });
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setMessages((prev) => [...prev, receivedData]);
    };
    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(ws);
    console.log(messages);

    // Cleanup interval on component unmount
    return () => ws.close();
  }, []);

  return (
    <div className='App'>
      <h1>Train Routes</h1>

      <RouteList routes={messages} />
    </div>
  );
}

export default App;

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
