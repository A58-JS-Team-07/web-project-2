import { useEffect, useState } from "react";
import { getAllPostComments } from "../../services/posts.service";
import SingleComment from "./SingleComment.jsx";
import { set } from "firebase/database";

function AllComments({ postId, followClick, setFollowClick }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllPostComments(postId).then((comments) => {
      setComments(comments);
    });
  }, [postId, followClick]);

  return (
    <div className="all-comments">
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          setFollowClick={setFollowClick}
        />
      ))}
    </div>
  );
}

export default AllComments;
