import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import AdminScreen from "./screens/AdminScreen";
import UserScreen from "./screens/UserScreen";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      {socket && (
        <Routes>
          <Route
            path="/"
            element={
              <UserScreen socket={socket} names={names} setNames={setNames} />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminScreen socket={socket} names={names} setNames={setNames} />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
