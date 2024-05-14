import "./AllPosts.css";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service.js";
import Post from "../../components/Post/Post.jsx";
import { ref, onChildChanged, onChildRemoved } from "firebase/database";
import { db } from "../../config/firebase-config.js";

export default function AllPosts({ page }) {
  const [posts, setPosts] = useState([]);
  const [followClickAll, setFollowClickAll] = useState(false);

  //For the posts to be updated in real time, we need to use the onChildChanged method from the Firebase SDK.
  useEffect(() => {
    getAllPosts()
      .then((posts) => posts.reverse())
      .then(setPosts);
  }, []);

  useEffect(() => {
    getAllPosts()
      .then((posts) => posts.reverse())
      .then(setPosts);
  }, [followClickAll]);

  // useEffect(() => {
  //   const unsubscribe = onChildChanged(ref(db, "posts"), (snapshot) => {
  //     const value = snapshot.val();
  //     setPosts((posts) =>
  //       posts.map((p) => {
  //         if (p.author === value.author && p.details === value.details) {
  //           return {
  //             ...p,
  //             ...value,
  //           };
  //         } else {
  //           return p;
  //         }
  //       })
  //     );
  //   });

  //   // Cleanup function
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onChildRemoved(ref(db, "posts"), (snapshot) => {
  //     const value = snapshot.val();
  //     setPosts((posts) =>
  //       posts.filter(
  //         (p) => !(p.author === value.author && p.details === value.details)
  //       )
  //     );
  //   });

  //   // Cleanup function
  //   return () => unsubscribe();
  // }, []);

  const handleSort = (e) => {
    if (e.target.value === "liked") {
      const sortedByVotes = [...posts].sort((a, b) => b.votes - a.votes);
      page !== "home"
        ? setPosts(sortedByVotes)
        : setPosts(sortedByVotes.slice(0, 10));

    } else if (e.target.value === "commented") {
      const sortedByComments = [...posts].sort(
        (a, b) => b.commentsCount - a.commentsCount
      );
      page !== "home"
        ? setPosts(sortedByComments)
        : setPosts(sortedByComments.slice(0, 10));

    } else {
      const sortedByDate = [...posts].sort((a, b) => b.createdOn - a.createdOn);
      page !== "home"
        ? setPosts(sortedByDate)
        : setPosts(sortedByDate.slice(0, 10));

    }
  };

  // useEffect(() => {
  //     return onChildChanged(ref(db, 'posts'), (snapshot) => {
  //         const updatedPost = snapshot.val();
  //         const updatedPosts = posts.map((post) => {
  //             if (post.id === snapshot.key) {
  //                 return {
  //                     ...post,
  //                     ...updatedPost,
  //                 };
  //             }

  //             return post;
  //         });

  //         setPosts(updatedPosts);
  //     });
  // }, []);

  return (
    <div>
      {page !== "home" && <h1>All Posts</h1>}

      <div className="sorting">
        <div className="sorting-dropdown">
          <label htmlFor="sorting">Sort by:</label>
          <select name="sorting" id="sorting" onChange={handleSort}>
            <option value="recent">Most recent </option>
            <option value="liked">Most liked</option>
            <option value="commented">Most commented</option>
          </select>
        </div>
        {posts.length > 0 ? (
          <div className="posts">
            {posts.map((post) => (
              <Post key={post.id} post={post} variant={"readPost"} setFollowClickAll={setFollowClickAll} followClickAll={followClickAll} />
            ))}
          </div>
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}
