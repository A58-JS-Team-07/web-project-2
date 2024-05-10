import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post.jsx";
import { getPostById } from "../../services/posts.service.js";
import AddComment from "../../components/Comments/AddComment.jsx";

export default function PostDetailed() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentBtnName, setCommentBtnName] = useState("Add Comment");

  useEffect(() => {
    console.log(id);
    getPostById(id).then((post) => setPost(post));
    setPost({
      ...post,
      id,
    });
  }, [id]);

  function handleAddCommentFunc() {
    if (isCommenting) {
      setCommentBtnName("Add Comment");
    } else {
      setCommentBtnName("Cancel");
    }
    setIsCommenting(!isCommenting);
  }

  return (
    <div>
      <h1>Post Details</h1>
      {post && (
        <Post
          post={post}
          variant={"addComment"}
          addCommentBtnName={commentBtnName}
          handleAddComment={handleAddCommentFunc}
        />
      )}
      {isCommenting && <AddComment postId={id} />}
    </div>
  );
}