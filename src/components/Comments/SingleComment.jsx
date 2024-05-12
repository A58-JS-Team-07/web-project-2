import "./SingleComment.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../Button/Button";
import { updateComment, deleteComment } from "../../services/posts.service";
import HideForBanUser from "../../hoc/BanProtect/HideForBanUser";

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

  const handleEditSave = async () => {
    setIsEditing(false);
    await updateComment(
      comment.postId,
      comment.id,
      newCommentContent,
      comment.username
    );
  };

  const handleDeleteAsUser = () => {
    deleteComment(comment.postId, comment.id, comment.username);
  };

  const handleDeleteAsAdmin = () => {
    deleteComment(comment.postId, comment.id, comment.username);
  };

  return (
    <div className="single-comment">
      <div className="single-comment__user-info">
        <span>by {comment.username}</span>
        <span>
          {new Date(comment.createdOn).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="quotes">"</span>
      </div>
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
            <div className="single-comment__nav-buttons">
              <Button onClick={handleEditSave}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div>
            <p>{comment.commentContent}</p>
            <div className="single-comment__nav-buttons">
              {userData?.username === comment?.username && (
                <HideForBanUser>
                  <span className="edit" onClick={handleEdit}>
                    Edit
                  </span>
                </HideForBanUser>
              )}
              {userData?.isAdmin ? (
                <span className="delete" onClick={handleDeleteAsAdmin}>
                  Delete
                </span>
              ) : (
                userData?.username === comment?.username && (
                  <HideForBanUser>
                    <span className="delete" onClick={handleDeleteAsUser}>
                      Delete
                    </span>
                  </HideForBanUser>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
