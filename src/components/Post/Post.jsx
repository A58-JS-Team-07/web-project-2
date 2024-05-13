import "./Post.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import {
  upvotePost,
  downvotePost,
  updatePost,
} from "../../services/posts.service.js";
import { AppContext } from "../../context/AppContext.jsx";
import { deletePost } from "../../services/posts.service.js";
import DisplayForAdmin from "../../hoc/AdminProtect/DisplayForAdmin.jsx";
import HideForBanUser from "../../hoc/BanProtect/HideForBanUser.jsx";
import { set } from "firebase/database";

export default function Post({
  post,
  variant,
  handleAddComment,
  addCommentBtnName,
  setFollowClick,
  page
}) {
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ ...post });
  const [isUpvoted, setIsUpvoted] = useState('false');
  const [isDownvoted, setIsDownvoted] = useState('false');

  const upvoteCurrPost = () => {
    upvotePost(post?.id, user?.uid);
    setFollowClick((prev) => !prev);
  };
  const downvoteCurrPost = () => {
    downvotePost(post?.id, user?.uid);
    setFollowClick((prev) => !prev);
  };
  const deleteCurrPost = () => deletePost(post?.id, post?.author);

  //TODO: This should be corrected because Ivo added a prop that
  const buttonText = variant === "readPost" ? "Read Post" : addCommentBtnName;

  //We need this useEffect to be able to show the current post in the edit form when we first click the edit button
  useEffect(() => {
    setUpdatedPost({ ...post });
    const upvoted = post?.upvotedBy ? Object.keys(post?.upvotedBy).some(id => id === user?.uid) : false;
    const downvoted = post?.downvotedBy ? Object.keys(post?.downvotedBy).some(id => id === user?.uid): false;
    setIsUpvoted(upvoted);
    setIsDownvoted(downvoted);
  }, [post]);

  const handleEditSave = async () => {
    if (updatedPost.title.length < 16 || updatedPost.title.length > 64) {
      return alert("Title must be between 16 and 64 characters long");
    }

    if (updatedPost.details.length < 32 || updatedPost.details.length > 8192) {
      return alert("Post must be between 32 and 8192 characters long");
    }

    setIsEditing(false);
    await updatePost(updatedPost.id, updatedPost.title, updatedPost.details);
    setFollowClick((prev) => !prev);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setUpdatedPost(post);
  };

  const handleDeleteButton = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteCurrPost();
      navigate(`/posts`);
    }
  };

  const updateForm = (prop) => (e) => {
    setUpdatedPost({
      ...updatedPost,
      [prop]: e.target.value,
    });
  };

  const handleDetailsLength = (postDetail) => {
    if (page !== 'detailedPage' && postDetail?.length > 100) {
      return postDetail.slice(0, 100) + "[...]";
    } else {
      return postDetail;
    }
  }

  function getCommentsCount() {
    return post.comments ? Object.keys(post.comments).length : 0;
  }

  return (
    <div className="post">
      {isEditing && variant === "addComment" ? (
        <div>
          <label htmlFor="title">Post title</label>
          <input
            type="text"
            value={updatedPost.title}
            onChange={updateForm("title")}
            placeholder="Post title"
          />
          <br />
          <br />
          <label htmlFor="details">Post description</label>
          <textarea
            value={updatedPost.details}
            onChange={updateForm("details")}
            placeholder="Post description"
          />
          <br />
          <br />
          <Button onClick={handleEditSave}>Save</Button>
          <Button onClick={handleEditCancel}>Cancel</Button>
        </div>
      ) : (
        <div>
          <p className="post__meta">
            by {post?.author} | 📅{" "}
            {new Date(post?.createdOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}{" "}
            | 💬 {post?.commentsCount ? post?.commentsCount : 0}
          </p>
          <h2 className="post__title">{post?.title}</h2>
          <p className="post__description">{handleDetailsLength(post?.details)}</p>
          <div className="post__actions">
            <div className="post__actions__left">
              {variant === "addComment" ? (
                <HideForBanUser>
                  <Button onClick={handleAddComment}>{buttonText}</Button>
                </HideForBanUser>
              ) : (
                <Button onClick={() => navigate(`/posts/${post?.id}`)}>
                  Read Post
                </Button>
              )}
              <div className={"post__voting" + " " + "upvoted-" + isUpvoted + " " + "downvoted-" + isDownvoted}>
                <HideForBanUser>
                  <span
                    className="post__voting__upvote"
                    onClick={upvoteCurrPost}
                  >
                    {
                      <svg
                        height="20"
                        fill="#fff"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z"></path>
                      </svg>
                    }
                  </span>
                </HideForBanUser>
                <span>{post?.votes}</span>
                <HideForBanUser>
                  <span
                    className="post__voting__downvote"
                    onClick={downvoteCurrPost}
                  >
                    <svg
                      height="20"
                      fill="#fff"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path d="M18.88 9.7a1.114 1.114 0 0 0-1.006-.7H14V2.123A1.125 1.125 0 0 0 12.877 1H7.123A1.125 1.125 0 0 0 6 2.123V9H2.123a1.114 1.114 0 0 0-1.005.7 1.25 1.25 0 0 0 .176 1.348l7.872 8.581a1.124 1.124 0 0 0 1.667.003l7.876-8.589A1.248 1.248 0 0 0 18.88 9.7Z"></path>
                    </svg>
                  </span>
                </HideForBanUser>
              </div>
            </div>
            {variant === "addComment" &&
              userData?.username === post?.author && (
                <HideForBanUser>
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                </HideForBanUser>
              )}

            {userData?.isAdmin && (
              <DisplayForAdmin>
                <Button onClick={handleDeleteButton}>Delete</Button>
              </DisplayForAdmin>
            )}
            {userData?.username === post?.author && !userData?.isAdmin && (
              <HideForBanUser>
                <Button onClick={handleDeleteButton}>Delete</Button>
              </HideForBanUser>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
