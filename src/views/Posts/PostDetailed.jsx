import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import { getPostById } from '../../services/posts.service.js';

export default function PostDetailed() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        console.log(id);
        getPostById(id).then((post)  => setPost(post));
        setPost({
            ...post,
            id,
        })


    }, [id]);

    return (
        <div>
            <h1>Post Details</h1>
            {post && <Post post={post} variant={"addComment"} />}
        </div>
    );
}