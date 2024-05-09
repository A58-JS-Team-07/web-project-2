import {
  getAllUsers,
  changeAdminStatus,
  changeBanStatus
} from "../../services/users.service.js";
import Button from "../../components/Button/Button.jsx";
import ProfileAvatar from "../../components/Header/Profile/ProfileAvatar.jsx";
import { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    getAllUsers().then((snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);

  function handleMakeAdmin(user) {
    const currStatus = user.isAdmin;
    changeAdminStatus(user.username, !currStatus).then(() => {
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.uid === user.uid) {
            return { ...u, isAdmin: !currStatus };
          }
          return u;
        });
      });
    });
  }


  function handleBanUser(user) {
    const currStatus = user.isBanned;
    changeBanStatus(user.username, !currStatus).then(() => {
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.uid === user.uid) {
            return { ...u, isBanned: !currStatus };
          }
          return u;
        });
      });
    });
  }

  return (
    <div>
      <h1>Manage Users</h1>
      {users.filter((user) => user.uid !== userData.uid).map((user) => {
        return (
          <div className="user-card" key={user.uid}>
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
              {user.isAdmin ? (
                <Button onClick={() => handleMakeAdmin(user)} variant="danger">Remove admin</Button>
              ) : (
                <Button onClick={() => handleMakeAdmin(user)} variant="primary">Make admin</Button>
              )}
              {user.isBanned ? (
                <Button onClick={() => handleBanUser(user)} variant="danger">Unban</Button>
              ) : (
                <Button onClick={() => handleBanUser(user)} variant="primary">Ban</Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ManageUsers;
