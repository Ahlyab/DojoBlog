import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BulkUpload2 = () => {
  const [blogs, setBlogs] = useState([
    { title: "", body: "", author: "mario" },
  ]);
  const navigate = useNavigate();
  const [failedArray, setFailedArray] = useState([]);
  const [error, setError] = useState(false);

  // Handle changes to input fields
  const handleInputChange = (index, field, value) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index][field] = value; // Update the specific field (title, body, author)
    setBlogs(updatedBlogs);
  };

  // Add a new set of input fields
  const addField = (e, index) => {
    e.preventDefault();
    blogs.splice(index + 1, 0, { title: "", body: "", author: "mario" });
    setBlogs([...blogs]);
  };

  // Delete a specific set of input fields
  const deleteField = (index, e) => {
    e.preventDefault();
    const updatedBlogs = blogs.filter((_, i) => i !== index); // Remove the field at the specified index
    setBlogs(updatedBlogs);
  };

  const submitAll = async (e) => {
    e.preventDefault();
    setError(false);
    let failed = [];

    for (const blog of blogs) {
      try {
        const response = await fetch("http://localhost:8000/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blog), // Send each blog object individually
        });

        if (!response.ok) {
          throw new Error("Failed to submit blog");
        }

        console.log("Blog submitted successfully:", blog);
      } catch (error) {
        console.log("Error submitting blog:", error);
        failed.push(blog); // Keep track of failed submissions
      }
    }

    if (failed.length > 0) {
      setFailedArray(failed); // Update failed array in state
      setError(true);
    } else {
      console.log("All blogs submitted successfully.");
      setBlogs([{ title: "", body: "", author: "mario" }]); // Reset fields
      navigate("/"); // Navigate to the root page after successful submission
    }
  };

  return (
    <>
      {error && <div className="error">Failed to submit blog(s).</div>}
      <form onSubmit={submitAll}>
        {blogs.map((blog, index) => (
          <div key={index} className="container">
            <input
              type="text"
              placeholder={`title ` + (index + 1)}
              className="input-field"
              value={blog.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder={`body ` + (index + 1)}
              className="input-field"
              value={blog.body}
              onChange={(e) => handleInputChange(index, "body", e.target.value)}
              required
            />
            <button className="add-button" onClick={(e) => addField(e, index)}>
              +
            </button>
            {index !== 0 && (
              <button
                className="delete-button"
                onClick={(e) => deleteField(index, e)}
              >
                -
              </button>
            )}
          </div>
        ))}

        <button className="submit-button">Submit</button>
      </form>
    </>
  );
};

export default BulkUpload2;
