import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Testing2 = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("testing2 is being rendered");
  }, []);
  return (
    <div>
      <h1>THis is a testing page 2</h1>

      <p>Current URL: {location.pathname}</p>
      <p>Key : {location.key}</p>
      <p>Hash : {location.hash}</p>
      <p>State : {location.state}</p>
    </div>
  );
};

export default Testing2;
