import { useState, useContext } from "react";
import { addPost } from "../../services/posts.service.js";
import Button from "../../components/Button/Button.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import "./CreatePost.css";

export default function CreatePost() {
  const { userData } = useContext(AppContext);
  const [post, setPost] = useState({
    title: "",
    details: "",
    author: userData.username,
  });

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  const createPost = async () => {
    if (post.title.length < 16 || post.title.length > 64) {
      return alert("Title must be between 16 and 64 characters long");
    }

    if (post.details.length < 32 || post.details.length > 8192) {
      return alert("Post must be between 32 and 8192 characters long");
    }

    await addPost(post.title, post.author, post.details);

    setPost({
      title: "",
      details: "",
    });

    alert("Post created successfully!");
  };

  return userData?.isBanned ? (
    <h1>You are banned and cannot create posts</h1>
  ) : (
    <div className="create-post">
      <h1>Create Post</h1>
      <div className="create-post__form">
        <div className="create-post__title">
          <label htmlFor="title">Post title</label>

          <input
            className="create-post__title__input"
            type="text"
            value={post.title}
            onChange={(e) => updatePost(e.target.value, "title")}
            placeholder="Add your post title here..."
          />
        </div>

        <div className="create-post__description">
          <label htmlFor="details">Post description</label>
          <br />
          <textarea
            className="create-post__description__input"
            value={post.details}
            onChange={(e) => updatePost(e.target.value, "details")}
            placeholder="Write your post here..."
          />
        </div>

        <Button onClick={createPost}>Publish Post</Button>
      </div>
    </div>
  );
}
