import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

    export default function SinglePost({ post }) {
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
                <Button>Like</Button>
                <Button>Dislike</Button>
                <Link>Delete Post</Link>
            </div>
        </div>)
}