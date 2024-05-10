import "./ProfileDropdown.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import { logoutUser } from "../../../services/auth.service.js";
import DisplayForAdmin from "../../../hoc/AdminProtect/DisplayForAdmin.jsx";

function ProfileDropdown() {
  const { setAppState } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
  };

  //TODO: Context for logged and non-logged user
  //TODO: Admin user condition

  return (
    <div className="profile__dropdown">
      <ul>
        <li>{<NavLink to="/profile">Profile</NavLink>}</li>
        {<DisplayForAdmin>
          <li>{<NavLink to="/manage-users">Manage users</NavLink>}</li>
        </DisplayForAdmin>}
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
