import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post.jsx";
import { getPostById } from "../../services/posts.service.js";
import AddComment from "../../components/Comments/AddComment.jsx";
import AllComments from "../../components/Comments/AllComments.jsx";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase-config.js";

export default function PostDetailed() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentBtnName, setCommentBtnName] = useState("Add Comment");
  const [followClick, setFollowClick] = useState(false);

  useEffect(() => {
    console.log(id);
    getPostById(id).then((post) => setPost(post));
    setPost({
      ...post,
      id,
    });
  }, [id, followClick]);

  // useEffect(() => {
  //   return onValue(ref(db, `posts/${id}`), (snapshot) => {
  //     setPost({
  //       ...snapshot.val(),
  //       id,
  //     })
  //   });
  // }, [id, rerender]);

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
          setFollowClick={setFollowClick}
        />
      )}
      {isCommenting && <AddComment postId={id} setFollowClick={setFollowClick}/>}
      <AllComments
        postId={id}
        followClick={followClick}
        setFollowClick={setFollowClick}
      />
    </div>
  );
}
