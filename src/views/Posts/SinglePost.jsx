import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';
import  Post  from '../../components/Post/Post';

    export default function SinglePost({ post }) {
    // const [post, setPost] = useState(null);
    const { id } = useParams();

    // useEffect(() => {
    //     return onValue(ref(db, `posts/${id}`), (snapshot) => {
    //         setPost(snapshot.val());
    //     });
    // }, [id]);

    return (
        <div>
            {post && <Post post={post}/>}
        </div>)
}