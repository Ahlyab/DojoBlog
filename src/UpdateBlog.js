import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const UpdateBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const navigate = useNavigate();

  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    }
  }, [blog]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };

    fetch("http://localhost:8000/blogs/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    })
      .then(() => {
        console.log("blog updated");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="create">
      <h2>Update Blog</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <form onSubmit={handleUpdate}>
          <label>Blog Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog Body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog Author:</label>
          <select
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="mario">mario</option>
            <option value="yoshi">yoshi</option>
          </select>
          <button>Update Blog</button>
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;
