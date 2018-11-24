import React, { useState, useEffect } from "react";

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

const App = () => {
  // calling useState allows us to create a single piece of state, as a result we can call useState multiple times
  // in classes, the state is always an object, with useState it doesn't have to be. It can be any JavaScript type (strings, number, booleans, objects, arrays, etc)
  const [count, setCount] = useState(0);
  // first value is the current value of the state, the second is a state setter function, allows us to the change the state. When we call it with a new value, the state will be set and the component will re-render
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

  const handleClick = () => {
    // setCount(steps + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <>
      <h2>Counter</h2>

      <button onClick={handleClick}>I was clicked {count} times</button>

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
