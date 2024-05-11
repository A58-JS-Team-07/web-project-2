import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import { PostContext } from '../../context/PostContext.jsx';
import { upvotePost, downvotePost } from '../../services/posts.service.js';
import { AppContext } from '../../context/AppContext.jsx';

export default function Post({ post, variant }) {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { handleDeletePost } = useContext(PostContext);
    const upvoteCurrPost = () => upvotePost(post.id, user.uid);
    const downvoteCurrPost = () => downvotePost(post.id, user.uid);
    const deleteCurrPost = () => handleDeletePost(post.id);

    const buttonText = variant === 'readPost' ? 'Read Post' : 'Add Comment';


    return (
        <div className="post">
            <p>@{post.author}, {new Date(post.createdOn).toLocaleDateString(
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
                <span>{post.votes}</span>
                <Button onClick={downvoteCurrPost}>Downvote</Button>
                <Button onClick={() => {
                    deleteCurrPost();
                    navigate(`/posts`);
                }
                }>Delete Post</Button>
            </div>
        </div>
    );
}