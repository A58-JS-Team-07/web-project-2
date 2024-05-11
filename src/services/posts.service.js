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
        // upvotedBy: {},
        // downvotebBy: {},
        // commentsList: {},
    };

    const postsRef = await push(ref(db, 'posts'), post);
    // await push(postsRef, post);
    // console.log(postsRef);
    const postId = postsRef.key;
    update(postsRef, { id: postId });
}

export const updatePost = async (postId, title, author, details) => {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);

    if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');

    const post = postSnapshot.val();
    post.title = title;
    post.author = author;
    post.details = details;

    await set(postRef, post);
}

export const getAllPosts = async () => {
    const postsRef = ref(db, 'posts');
    const postsSnapshot = await get(postsRef);
    if (!postsSnapshot.exists()) return [];

    const posts = [];

    postsSnapshot.forEach((post) => {
        posts.push({
            ...post.val(),
            id: post.key,
            upvotedBy: post.val().upvotedBy || [],
            downvotedBy: post.val().downvotedBy || [],
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
        upvotedBy: postSnapshot.val().upvotedBy || [],
        downvotedBy: postSnapshot.val().downvotedBy || [],
    };

}

export const deletePost = async (postId) => {

    const postRef = ref(db, `posts/${postId}`);
    await set(postRef, null);
}

export const upvotePost = async (postId, handle) => {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    const post = postSnapshot.val();

    if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');

    if (post.upvotedBy && post.upvotedBy[handle] === true) {
        return;   
    }

    post.votes += 1;
    post.upvotedBy = post.upvotedBy || {};
    post.upvotedBy[handle] = true;
    post.downvotedBy ? post.downvotedBy[handle] = null : null;

    update(postRef, post);
};

export const downvotePost = async (postId, handle) => {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    const post = postSnapshot.val();

    if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');

    if (post.downvotedBy && post.downvotedBy[handle] === true) {
        return;
    }
    
    post.votes -= 1;
    post.downvotedBy = post.downvotedBy || {};
    post.downvotedBy[handle] = true;
    post.upvotedBy ? post.upvotedBy[handle] = null : null;

    update(postRef, post);
}
