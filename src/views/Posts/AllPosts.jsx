import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';
import Post from '../../components/Post/Post.jsx';
import { ref, onChildChanged, onChildRemoved } from 'firebase/database';
import { db } from "../../config/firebase-config.js";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [sorting, setSorting] = useState('most');

    //For the posts to be updated in real time, we need to use the onChildChanged method from the Firebase SDK.
    useEffect(() => {
        getAllPosts()
        .then((posts) => posts.reverse())
        .then(setPosts);
    }, []);

    useEffect(() => {
        const unsubscribe = onChildChanged(ref(db, 'posts'), (snapshot) => {
          const value = snapshot.val();
          setPosts((posts) =>
            posts.map((p) => {
              if (p.author === value.author && p.details === value.details) {
                return {
                  ...p,
                  ...value,
                };
              } else {
                return p;
              }
            })
          );
        });
      
        // Cleanup function
        return () => unsubscribe();
      }, []);

      useEffect(() => {
        const unsubscribe = onChildRemoved(ref(db, 'posts'), (snapshot) => {
          const value = snapshot.val();
          setPosts((posts) =>
            posts.filter((p) => !(p.author === value.author && p.details === value.details))
          );
        });
      
        // Cleanup function
        return () => unsubscribe();
      }, []);
      


    const handleSort = (e) => {
        setSorting(e.target.value);
        if (e.target.value === 'liked') {
            setPosts(posts.sort((a, b) => b.votes - a.votes));
        } else if (sorting === 'commented') {
            setPosts(posts.sort((a, b) => b.commentsCount - a.commentsCount));
        } else {
            setPosts(posts.sort((a, b) => b.createdOn - a.createdOn));
        }
    }

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
            <h1>All Posts</h1>
            {console.log('post rerender')}
            <div className="sorting">
                <label htmlFor="sorting">Sort by:</label>
                <select name="sorting" id="sorting" onChange={handleSort}>
                    <option value="recent">Most recent </option>
                    <option value="liked">Most liked</option>
                    <option value="commented">Most commented</option>
                </select>
                {posts.length > 0 ? (
                    <div className="posts">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} variant={"readPost"} />))
                        }
                    </div>
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
}