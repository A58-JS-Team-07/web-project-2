import { getAllUsers } from "../../services/users.service.js";
import Button from "../../components/Button/Button.jsx";
import ProfileAvatar from "../../components/Header/Profile/ProfileAvatar.jsx";
import { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      {users.map((user, index) => {
        return (
          <div className="user-card" key={index}>
            <div className="user-card__info">
              <div className="user-card__info--left">
                {/*TODO: Add condition for user with avatar*/}
                <ProfileAvatar />
              </div>
              <div className="user-card__info--right">
                <span className="user-card__info__username">
                  {user.username}
                </span>
                <span className="user-card__info__email">{user.email}</span>
              </div>
            </div>
            <div className="user-card__actions">
              {/*TODO: Add functionality for ban/un-ban & make admin*/}
              <Button variant="primary">Ban</Button>
              <Button variant="danger">Make admin</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ManageUsers;
