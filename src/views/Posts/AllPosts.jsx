import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';
import Post from '../../components/Post/Post.jsx';
import { ref, onChildChanged } from 'firebase/database';
import { db } from '../../config/firebase-config';

export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    //For the posts to be updated in real time, we need to use the onChildChanged method from the Firebase SDK.
    useEffect(() => {
        getAllPosts().then(setPosts);
    }, []);

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


    // const handleUpvote = (postId) => {
    //     upvotePost(postId).then(() => {
    //         getAllPosts().then(setPosts);
    //     });
    // };

    // const handleDownvote = (postId) => {
    //     downvotePost(postId).then(() => {
    //         getAllPosts().then(setPosts);
    //     });
    // };

    return (
        // <PostContext.Provider value={{ handleDeletePost }}>
            <div>
                <h1>All Posts</h1>
                <div className="sorting">
                    <label htmlFor="sorting">Sort by:</label>
                    <select name="sorting" id="sorting">
                        <option value="liked">Most liked</option>
                        <option value="recent">Most recent </option>
                        <option value="commented">Most commented</option>
                    </select>
                    {posts.length > 0 ? (
                        <div className="posts">
                            {posts.map((post) => (

                                console.log(post),
                                <Post key={post.id} post={post} variant={"readPost"}/>))
                            }
                        </div>
                    ) : (
                        <p>No posts found</p>
                    )}
                </div>
            </div>
        // </PostContext.Provider>
    );
}