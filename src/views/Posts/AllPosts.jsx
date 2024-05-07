import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';
import SinglePost from './SinglePost';
import { ref, onChildChanged } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { deletePost } from '../../services/posts.service';

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
                }
                return post;
            });
            
            setPosts(updatedPosts);
        });
    }, []);
    
    const handleDeletePost = (postId) => {
        deletePost(postId);
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
    };

    return (
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
                        <SinglePost key={post.id} post={post} onDelete={handleDeletePost} />))
                    }
                </div>
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
}