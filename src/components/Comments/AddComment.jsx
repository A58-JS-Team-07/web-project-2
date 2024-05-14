import "./AddComment.css";
import { useState, useContext } from "react";
import { addComment } from "../../services/posts.service";
import { AppContext } from "../../context/AppContext";
import Button  from "../Button/Button.jsx"

const AddComment = ({ postId, setFollowClick}) => {
  const { userData } = useContext(AppContext);
  const [comment, setComment] = useState(""); // State to hold the comment

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    await addComment(postId, userData.username, comment);
    setComment("");
    setFollowClick((prev) => !prev);
  };

  return (
    <div className="add-comment">
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Add your comment here"
        id="comment"
        name="comment"
      />
      <Button onClick={handleAddComment}>Publish</Button>
    </div>
  );
};

export default AddComment;
