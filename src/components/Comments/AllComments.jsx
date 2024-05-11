import { useEffect, useState } from "react";
import { getAllPostComments } from "../../services/posts.service";
import SingleComment from "./SingleComment.jsx";

function AllComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllPostComments(postId).then((comments) => {
      setComments(comments);
      console.log(comments);
    });
  }, [postId]);

  return (
    <div className="all-comments">
      {comments.map((comment) => (
        <SingleComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default AllComments;
