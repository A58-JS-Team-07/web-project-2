import "./Header.css";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileAvatar from "./Profile/ProfileAvatar.jsx";
import ProfileDropdown from "./Profile/ProfileDropdown.jsx";

function Header() {
  //TODO: Context for logged and non-logged user

  const { user, setAppState } = useContext(AppContext);

  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="/home-diy-logo-w.png"
          alt="Home DIY Logo"
          className="header__logo__image"
          width="400px"
        />
      </div>
      <div className="header__navigation">
        {/*TODO: Context for logged and non-logged user*/}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">All Posts</NavLink>
        <NavLink to="/create-post">Create Post</NavLink>
      </div>
      <div className="header__login-profile">
        {user ? (
          <>
            <ProfileAvatar
              onClick={() => setOpenProfileDropdown((prev) => !prev)}
            />
            {openProfileDropdown && <ProfileDropdown />}
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
