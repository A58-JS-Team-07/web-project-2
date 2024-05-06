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
import AdminPageProtect from "./hoc/AdminPageProtect.jsx";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

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
              path="/manage-users"
              element={
                <Authenticated>
                  <AdminPageProtect>
                    <ManageUsers />
                  </AdminPageProtect>
                </Authenticated>
              }
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
          {/* <Footer /> */}
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
