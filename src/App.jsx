import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext.jsx";
import Home from "./views/Home/Home.jsx";
import Register from "./views/Register/Register.jsx";
import Login from "./views/Login/Login.jsx";
import ManageUsers from "./views/ManageUsers/ManageUsers.jsx";
import Header from "./components/Header/Header.jsx";
import { getUserData } from "./services/users.service.js";
import Authenticated from "./hoc/Authenticated.jsx";
import AdminPageProtect from "./hoc/AdminProtect/AdminPageProtect.jsx";
import AllPosts from "./views/Posts/AllPosts.jsx";
import CreatePost from "./views/CreatePost/CreatePost.jsx";
import PostDetailed from "./views/Posts/PostDetailed.jsx";
import { PostContext } from "./context/PostContext.jsx";
import { deletePost } from "./services/posts.service.js";
import Profile from "./views/Profile/Profile.jsx";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!appState.user) {
      return;
    }

    getUserData(appState.user.uid).then((snapshot) => {
      const userData = Object.values(snapshot.val())[0];
      setAppState({ ...appState, userData });
      console.log(userData.isAdmin);
    });
  }, [appState.user]);

  const handleDeletePost = (postId) => {
    deletePost(postId);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
};

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider
          /*
            user: appState.user,
            userData: appState.userData, 

            is the same as:
            ...appState,
          */
          value={{
            ...appState,
            setAppState,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <Authenticated>
                  <Profile />
                </Authenticated>
              }
            />
            <Route
              path="/manage-users"
              element={
                <Authenticated>
                  <AdminPageProtect>
                    <ManageUsers />
                  </AdminPageProtect>
                </Authenticated>
              }
            />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
          {/* <Footer /> */}
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
