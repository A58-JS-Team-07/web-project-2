import "./ProfileDropdown.css";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext.jsx";

function ProfileDropdown() {
  const { user, setAppState } = useContext(AppContext);
  //TODO: Context for logged and non-logged user
  //TODO: Logout function
  //TODO: Admin user condition

  return (
    <div className="profile__dropdown">
      <ul>
        <li>{<NavLink to="/profile">Profile</NavLink>}</li>
        {/*TODO: Add condition for admin user*/}
        <li>{<NavLink to="/manage-users">Manage users</NavLink>}</li>
        {/*TODO: Assign the logout function*/}
        <li onClick={() => setAppState({ user: null, userData: null })}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
