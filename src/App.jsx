import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext.jsx";
import Home from "./views/Home/Home.jsx";
import Register from "./views/Register/Register.jsx";
import Login from "./views/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import AllPosts from "./views/Posts/AllPosts.jsx";
import CreatePost from "./views/CreatePost/CreatePost.jsx";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

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
            setAppState
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
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
