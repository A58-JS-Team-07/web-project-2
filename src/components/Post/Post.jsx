import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import { PostContext } from '../../context/PostContext.jsx';
import { upvotePost, downvotePost, updatePost } from '../../services/posts.service.js';
import { AppContext } from '../../context/AppContext.jsx';

export default function Post({ post, variant, handleAddComment, addCommentBtnName }) {
    const navigate = useNavigate();
    const { user, userData } = useContext(AppContext);
    const { handleDeletePost } = useContext(PostContext);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({ ...post });

    const upvoteCurrPost = () => upvotePost(post.id, user.uid);
    const downvoteCurrPost = () => downvotePost(post.id, user.uid);
    const deleteCurrPost = () => handleDeletePost(post.id, userData.username);

    //TODO: This should be corrected because Ivo added a prop that 
    const buttonText = variant === 'readPost' ? 'Read Post' : addCommentBtnName;

    //We need this useEffect to be able to show the current post in the edit form when we first click the edit button
    useEffect(() => {
        setUpdatedPost({ ...post });
    }, [post]);

    const handleEditSave = async () => {
        if (updatedPost.title.length < 16 || updatedPost.title.length > 64) {
            return alert("Title must be between 16 and 64 characters long");
        }

        if (updatedPost.details.length < 32 || updatedPost.details.length > 8192) {
            return alert("Post must be between 32 and 8192 characters long");
        }

        setIsEditing(false);
        await updatePost(updatedPost.id, updatedPost.title, updatedPost.details);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setUpdatedPost(post);
    };

    const handleDeleteButton = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteCurrPost();
            navigate(`/posts`);
        }
    };

    const updateForm = (prop) => (e) => {
        setUpdatedPost({
            ...updatedPost,
            [prop]: e.target.value,
        });
    };

    function getCommentsCount() {
        return post.comments ? Object.keys(post.comments).length : 0;
    }

    return (
        <div className="post">
            {isEditing && variant === 'addComment' ? (
                <div>
                    <label htmlFor="title">Post title</label>
                    <input type="text" value={updatedPost.title} onChange={updateForm('title')} placeholder="Post title" />
                    <br />
                    <br />
                    <label htmlFor="details">Post description</label>
                    <textarea value={updatedPost.details} onChange={updateForm('details')} placeholder="Post description" />
                    <br />
                    <br />
                    <Button onClick={handleEditSave}>Save</Button>
                    <Button onClick={handleEditCancel}>Cancel</Button>
                </div>
            ) : (
                <div>
                    <p>@{post.author}, {new Date(post.createdOn).toLocaleDateString(
                        'en-US',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }
                    )}, comments: {post.commentsCount ? post.commentsCount : 0}</p>
                    <h2>{post.title}</h2>
                    <p>{post.details}</p>
                    <div className="post__actions">
                        {variant === 'addComment' ? (
                            <Button onClick={handleAddComment}>{buttonText}</Button>
                        ) : (
                            <Button onClick={() => navigate(`/posts/${post.id}`)}>Read Post</Button>
                        )}
                        <Button onClick={upvoteCurrPost}>Upvote</Button>
                        <span>{post.votes}</span>
                        <Button onClick={downvoteCurrPost}>Downvote</Button>
                        {variant === 'addComment' && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
                        <Button onClick={handleDeleteButton}>Delete Post</Button>
                    </div>
                </div>
            )}
        </div>
    );
}