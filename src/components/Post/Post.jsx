import React, { useContext } from 'react';
import Button from '../Button/Button';
import { PostContext } from '../../context/PostContext';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
    const { handleDeletePost, handleUpvote, handleDownvote } = useContext(PostContext);
    const deleteCurrPost = () => handleDeletePost(post.id);
    const upvoteCurrPost = () => handleUpvote(post.id);
    const downvoteCurrPost = () => handleDownvote(post.id);

    return (
        <div className="post">
            <p>by {post.author}, {new Date(post.createdOn).toLocaleDateString(
                'en-US',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }
            )}</p>
            <h2>{post.title}</h2>
            <p>{post.details}</p>
            <div className="post__actions">
                <Button>Read Post</Button>
                <Button onClick={upvoteCurrPost}>Upvote</Button>
                <Button onClick={downvoteCurrPost}>Downvote</Button>
                <Link onClick={deleteCurrPost}>Delete Post</Link>
            </div>
        </div>
    );
}