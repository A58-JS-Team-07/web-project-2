import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';
import SinglePost from './SinglePost';
import { ref, onChildChanged } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { deletePost, upvotePost, downvotePost } from '../../services/posts.service';
import { PostContext } from '../../context/PostContext';

export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then(setPosts);
    }, []);

    useEffect(() => {
        return onChildChanged(ref(db, 'posts'), (snapshot) => {
            const updatedPost = snapshot.val();
            const updatedPosts = posts.map((post) => {
                if (post.id === snapshot.key) {
                    if (updatedPost.likedBy) {
                        post.likedBy = Object.keys(updatedPost.likedBy).length;
                    } else {
                        post.likedBy = [];
                    }
                    return {
                        ...post,
                        ...updatedPost,
                    };
                } else {
                    return post;
                }
            });

            setPosts(updatedPosts);
        });
    }, []);

    const handleDeletePost = (postId) => {
        deletePost(postId);
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
    };

    const handleUpvote = (postId) => {
        upvotePost(postId).then(() => {
            getAllPosts().then(setPosts);
        });
    };

    const handleDownvote = (postId) => {
        downvotePost(postId).then(() => {
            getAllPosts().then(setPosts);
        });
    };

    return (
        <PostContext.Provider value={{ handleDeletePost, handleUpvote, handleDownvote }}>
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
                                <SinglePost key={post.id} post={post} />))
                            }
                        </div>
                    ) : (
                        <p>No posts found</p>
                    )}
                </div>
            </div>
        </PostContext.Provider>
    );
}