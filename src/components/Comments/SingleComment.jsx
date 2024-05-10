import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../Button/Button";

function SingleComment({ comment }) {
  const { userData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState(
    comment.commentContent
  );

  const updateForm = (e) => {
    setNewCommentContent(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewCommentContent(comment.commentContent); 
  };

  const handleSave = () => {
    setIsEditing(false);
    // Call the updateComment function
  };

  const handleDelete = () => {};

  return (
    <div className="single-comment">
      <div className="single-comment__user-info"></div>
      <div className="single-comment__user-comment">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newCommentContent}
              onChange={updateForm}
              name="comment"
              id="comment"
            />
            <Button>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        ) : (
          <div>
            <p>{comment.commentContent}</p>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
