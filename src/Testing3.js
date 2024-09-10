import React, { useEffect } from "react";

const Testing3 = () => {
  useEffect(() => {
    console.log("testing2 is being rendered");
  }, []);
  return (
    <div>
      <h1>THis is a testing page 3</h1>
    </div>
  );
};

export default Testing3;
