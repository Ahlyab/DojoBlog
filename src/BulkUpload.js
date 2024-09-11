import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BulkUpload = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const navigate = useNavigate();
  const [failedArray, setFailedArray] = useState([]);
  const [error, setError] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const newBlog = { title, body, author };
    setBlogs([...blogs, newBlog]);
    setTitle("");
    setBody("");
    setAuthor("mario");
  };

  const handleDelete = (index) => {
    const newBlogs = blogs.filter((blog, i) => i !== index);
    setBlogs(newBlogs);
  };

  const submitAll = async () => {
    // setting error to false to reset the error state
    setError(false);
    let success = true;

    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];
      try {
        const response = await fetch("http://localhost:8000/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blog),
        });
        console.log(response);
        if (!response.ok) {
          console.log("Failed to submit blog", blog);
          setFailedArray((prevFailedArray) => [...prevFailedArray, blog]);
          setError(true);
          success = false;
        }
      } catch (e) {
        console.log(e);
        setFailedArray((prevFailedArray) => [...prevFailedArray, blog]);
        setError(true);
        success = false;
      }
    }
    if (success === true) {
      setBlogs([]);
      navigate("/");
    }
  };
  return (
    <div className="create">
      <form onSubmit={handleAdd}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Add Blog</button>
      </form>
      {blogs.length > 0 && !error && (
        <div className="blog-preview">
          <h2>Blog preview</h2>
          {blogs.map((blog, index) => (
            <div className="blog box" key={blog.title}>
              <h2>
                {blog.title} - {index}
              </h2>
              <p>Written by {blog.author}</p>
              <p>{blog.body}</p>
              {index !== 0 && (
                <button
                  style={{ margin: "2px" }}
                  onClick={() => handleDelete(index)}
                >
                  Delete Blog
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {blogs.length > 0 && (
        <div className="create submit-all">
          <button onClick={submitAll}>Submit All</button>
        </div>
      )}

      {error && (
        <div>
          <h2 style={{ color: "red", textDecoration: "underline" }}>
            Failed to submit the following blogs
          </h2>
          {failedArray.map((blog, index) => (
            <div className="blog box" key={blog.title}>
              <h2>
                {blog.title} - {index}
              </h2>
              <p>Written by {blog.author}</p>
              <p>{blog.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
