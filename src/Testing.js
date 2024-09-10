import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";

const Testing = () => {
  const inputRef = useRef(null); // Create a ref for the input element

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Input Value: ${inputRef.current.value}`); // Access input value using ref
  };

  return (
    <div>
      <h2>Uncontrolled Input with useRef</h2>
      <Outlet />
      <Link to="./testing2">Testing 2</Link>
      <Link to="./testing3">Testing 3</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef} // Attach ref to the input element
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Testing;
