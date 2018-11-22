import React, { useState, useEffect } from "react";

const initialLocationState = {
  altitude: null,
  latitude: null,
  longitude: null,
  speed: null,
  timestamp: Date.now()
};

const App = () => {
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState(initialLocationState);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  let mounted = true;
  let watchId;

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("mousemove", handleMouseMove);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  };

  const handleGeolocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={() => setCount(prev => prev + 1)}>
        Click me {count}
      </button>
      <br />
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />
      <h2>Geolocation</h2>
      {JSON.stringify(location, null, 2)}
      <br />
      <h2>Network Status</h2>
      <strong>{status ? "Online" : "Offline"}</strong>
    </>
  );
};

export default App;
