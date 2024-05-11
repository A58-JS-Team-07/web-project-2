import { get, set, push, update, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config.js';

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (username, uid, email, firstName, lastName) => {

  return set(ref(db, `users/${username}`), { username, uid, email, firstName, lastName, isAdmin: false, isBanned: false, createdOn: Date.now() })
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getAllUsers = () => {
  return get(ref(db, 'users'));
};

export const updateUser = (username, data) => {
  return set(ref(db, `users/${username}`), {...data, updatedOn: Date.now()}); 
}

export const changeAdminStatus = (username, status) => {
  return set(ref(db, `users/${username}/isAdmin`), status);
}

export const changeBanStatus = (username, status) => {
  return set(ref(db, `users/${username}/isBanned`), status);
}

export const addUserComment = async (username, postId, commentContent, commentKey) => {
  const commentObj = {
    postId,
    commentContent,
    createdOn: Date.now()
  }

  await set(ref(db, `users/${username}/comments/${commentKey}`), commentObj);
}

export const updateUserComment = async (username, commentKey, commentContent) => {
  const commentObj = {
    commentContent,
    updatedOn: Date.now()
  }

  await update(ref(db, `users/${username}/comments/${commentKey}`), commentObj);
}

export const deleteUserComment = async (username, commentKey) => {
  const commentRef = ref(db, `users/${username}/comments/${commentKey}`);
  await set(commentRef, null);
}