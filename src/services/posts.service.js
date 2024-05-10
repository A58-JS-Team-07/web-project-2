import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { db } from "../config/firebase-config";
import { useNavigate } from 'react-router-dom';

export const addPost = async (title, author, details) => {
    const post = {
        title,
        author,
        details,
        createdOn: Date.now(),
        votes: 0,
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

export const getPostById = async (postId) => {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);

    if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');

    return {
        ...postSnapshot.val(),
        id: postId,
    };

}

export const deletePost = async (postId) => {

    const postRef = ref(db, `posts/${postId}`);
    await set(postRef, null);
}

export const upvotePost = async (postId, handle) => {
    const updateVal = {};
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    const post = postSnapshot.val();

    console.log(post);
    if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');

    post.votes += 1;

    update(postRef, post);
    // post.upvotedBy = post.upvotedBy || {};
    // post.upvotedBy[handle] = true;
};

export const downvotePost = async (postId, handle) => {
    const updateVal = {};
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);

    // if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');
    const post = postSnapshot.val();
    post.votes -= 1;

    update(postRef, post);

    // post.downvotedBy = post.downvotedBy || {};
    // post.downvotedBy[handle] = true;
}
