import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import { PostContext } from '../../context/PostContext.jsx';
import { upvotePost, downvotePost } from '../../services/posts.service.js';

export default function Post({ post, variant }) {
    const navigate = useNavigate();
    const { handleDeletePost } = useContext(PostContext);
    const upvoteCurrPost = () => upvotePost(post.id);
    const downvoteCurrPost = () => downvotePost(post.id);
    const deleteCurrPost = () => handleDeletePost(post.id);

    const buttonText = variant === 'readPost' ? 'Read Post' : 'Add Comment';


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
                {variant === 'addComment' ? (
                    <Button>{buttonText}</Button>
                ) : (
                    <Button onClick={() => navigate(`/posts/${post.id}`)}>Read Post</Button>
                )}
                <Button onClick={upvoteCurrPost}>Upvote</Button>
                <Button onClick={downvoteCurrPost}>Downvote</Button>
                {/* <Link onClick={ deleteCurrPost}>Delete Post</Link> */}
                <Button onClick={() => {
                    deleteCurrPost();
                    
                    navigate(`/posts`);
                }
                }>Delete Post</Button>
            </div>
        </div>
    );
}