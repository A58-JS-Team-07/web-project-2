import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { db } from "../config/firebase-config";
import { useNavigate } from 'react-router-dom';
import { addUserComment, updateUserComment, deleteUserComment } from './users.service.js';

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


export const getAllPostComments = async (postId) => {
    const postCommentsRef = ref(db, `posts/${postId}/comments`);
    const postCommentsSnapshot = await get(postCommentsRef);

    if (!postCommentsSnapshot.exists()) return [];

    const comments = [];

    postCommentsSnapshot.forEach((comment) => {
        comments.push({
            id: comment.key,
            ...comment.val(),
        });
    });

    return comments;
}

export const addComment = async (postId, username, commentContent) => {
    const commentObj = {
        username,
        commentContent,
        createdOn: Date.now(),
    };

    const postCommentsRef = ref(db, `posts/${postId}/comments`);
    await push(postCommentsRef, commentObj);

    //Get last comment key to add as a key to user comments
    const postCommentsSnapshot = await get(postCommentsRef);
    const commentKeys = Object.keys(postCommentsSnapshot.val());
    const commentKey = commentKeys[commentKeys.length - 1];
    
    await addUserComment(username, postId, commentContent, commentKey);

}

export const updateComment = async (postId, postCommentKey, commentContent, username ) => {
    const commentObj = {
        commentContent,
        updatedOn: Date.now(),
    };

    await push(ref(db, `posts/${postId}/comments/${postCommentKey}`), commentObj);
    await updateUserComment(username, postCommentKey, commentContent);
}


// TODO: Implement deleteComment function
export const deleteComment = async (postId, postCommentKey, username) => {
    const postCommentRef = ref(db, `posts/${postId}/comments/${postCommentKey}`);
    await set(postCommentRef, null);
    await deleteUserComment(username, postCommentKey);
}
