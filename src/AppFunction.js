import React, { useState, useEffect } from "react";

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  // you can in fact destructure values in state
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );
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
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const toggleLight = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        I was clicked {count} times
      </button>

      <h2>Toggle Light</h2>
      {/* <div
        style={{
          height: "50px",
          width: "50px",
          background: isOn ? "yellow" : "grey"
        }}
        onClick={toggleLight}
      /> */}
      <img
        src={
          isOn
            ? `https://icon.now.sh/highlight/fd0`
            : `https://icon.now.sh/highlight/aaa`
        }
        style={{
          height: "50px",
          width: "50px"
        }}
        alt="Lightbulb"
        onClick={toggleLight}
      />

      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />

      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : "0"}</p>

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>
    </>
  );
};

export default App;
