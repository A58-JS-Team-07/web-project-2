import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import ProfileAvatar from "./Profile/ProfileAvatar.jsx";
import ProfileDropdown from "./Profile/ProfileDropdown.jsx";

function Header() {
  //TODO: Context for logged and non-logged user
  const { user, userData } = useContext(AppContext);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpenProfileDropdown(false);
  }, [location]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        openProfileDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpenProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openProfileDropdown]);

  return (
    <>
      {userData?.isBanned && (
        <div className="top-header">
          You are banned. You can only see posts but you cannot interact with
          them.
        </div>
      )}
      <header className="header">
        <div className="header__logo">
          <img
            src="/home-diy-logo-w.png"
            alt="Home DIY Logo"
            className="header__logo__image"
            width="320px"
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
            <div className="header__login-profile--profile" ref={dropdownRef}>
              <ProfileAvatar
                onClick={() => setOpenProfileDropdown((prev) => !prev)}
              />
              <span>Hi, {userData?.firstName}</span>
              {openProfileDropdown && <ProfileDropdown />}
            </div>
          ) : (
            <div className="header__login-profile--login">
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
