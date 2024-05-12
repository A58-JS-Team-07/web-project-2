import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { db } from "../config/firebase-config";
import { addUserComment, updateUserComment, deleteUserComment } from './users.service.js';

export const addPost = async (title, author, details) => {
    const post = {
        title,
        author,
        details,
        createdOn: Date.now(),
        votes: 0,
        comments: 0,
    };

    const postsRef = await push(ref(db, 'posts'), post);

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
        post.votes -= 1;
        post.upvotedBy[handle] = null;
    } else {
        post.downvotedBy ? post.votes += 2 : post.votes += 1;
        post.upvotedBy = post.upvotedBy || {};
        post.upvotedBy[handle] = true;
        post.downvotedBy ? post.downvotedBy[handle] = null : null;
    }

    update(postRef, post);
};

export const downvotePost = async (postId, handle) => {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    const post = postSnapshot.val();

    if (!postSnapshot.exists()) throw new Error('Post with this id does not exist!');

    if (post.downvotedBy && post.downvotedBy[handle] === true) {
        post.votes += 1;
        post.downvotedBy[handle] = null;
    } else {
        post.upvotedBy ? post.votes -= 2 : post.votes -= 1;
        post.downvotedBy = post.downvotedBy || {};
        post.downvotedBy[handle] = true;
        post.upvotedBy ? post.upvotedBy[handle] = null : null;
    }
    
    update(postRef, post);
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
        postId,
        createdOn: Date.now(),
    };

    const commentsCount = await get(ref(db, `posts/${postId}/commentsCount`));

    if (commentsCount.exists()) {
        await set(ref(db, `posts/${postId}/commentsCount`), commentsCount.val() + 1);
    } else {
        await set(ref(db, `posts/${postId}/commentsCount`), 1);
    }

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

    await update(ref(db, `posts/${postId}/comments/${postCommentKey}`), commentObj);
    await updateUserComment(username, postCommentKey, commentContent);
}

export const deleteComment = async (postId, postCommentKey, username) => {
    const postCommentRef = ref(db, `posts/${postId}/comments/${postCommentKey}`);

    const commentsCount = await get(ref(db, `posts/${postId}/commentsCount`));

    if (commentsCount.exists()) {
        await set(ref(db, `posts/${postId}/commentsCount`), commentsCount.val() - 1);
    } else {
        await set(ref(db, `posts/${postId}/commentsCount`), 0);
    }

    await set(postCommentRef, null);
    await deleteUserComment(username, postCommentKey);
}