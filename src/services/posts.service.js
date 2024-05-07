import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { db } from "../config/firebase-config";

export const addPost = async (title, author, details) => {
    const post = {
        title,
        author,
        details,
        createdOn: Date.now(),
        likes: 0,
        dislikes: 0,
        comments: 0,
        // likedBy: {},
        // dislikedBy: {},
        // commentsList: {},
    };

    const postsRef = await push(ref(db, 'posts'), post);
    // await push(postsRef, post);
    console.log(postsRef);
}

export const getAllPosts = async () => {
    const postsRef = ref(db, 'posts');
    const postsSnapshot = await get(postsRef);
    if (!postsSnapshot.exists()) return [];

    const posts = [];

    postsSnapshot.forEach((post) => {
        posts.push({
            id: post.key,
            ...post.val(),
        });
    });

    return posts;
}

export const deletePost = async (postId) => {
    const postRef = ref(db, `posts/${postId}`);
    await set(postRef, null);
}

export const likePost = async (postId, handle) => {
    const updateVal = {};

    updateVal[`posts/${postId}/likedBy/${handle}`] = true;
};

export const removeLikePost = async (postId, handle) => {
    const updateVal = {};

    updateVal[`posts/${postId}/likedBy/${handle}`] = null;
};

export const dislikePost = async (postId, handle) => {
    const updateVal = {};

    updateVal[`posts/${postId}/dislikedBy/${handle}`] = true;
}

export const removeDislikePost = async (postId, handle) => {
    const updateVal = {};

    updateVal[`posts/${postId}/dislikedBy/${handle}`] = null;
}