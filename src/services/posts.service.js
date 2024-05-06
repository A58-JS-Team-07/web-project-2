import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { db } from "../config/firebase-config";

export const addPost = async (title, author, details) => {
    const post = {
        title,
        author,
        details,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        comments: 0,
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