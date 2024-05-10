import "./Profile.css";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { updateUser } from "../../services/users.service.js";


function Profile() {
  const { userData, setAppState } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({ ...userData });

  useEffect(() => {}, []);

  console.log(userData);

  const updateForm = (prop) => (e) => {
    setNewUserData({
      ...newUserData,
      [prop]: e.target.value,
    });
  };

  const saveChanges = async () => {
    await updateUser(userData.username, newUserData);
    setIsEditing(false);
    setAppState((prevState) => ({ ...prevState, userData: newUserData }));
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setNewUserData(userData);
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      {isEditing ? (
        <>
          <div className="profile__userInfo__data">
            <label htmlFor="firstName">First name</label>
            <input
              value={newUserData.firstName}
              onChange={updateForm("firstName")}
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="profile__userInfo__data">
            <label htmlFor="lastName">Last name</label>
            <input
              value={newUserData.lastName}
              onChange={updateForm("lastName")}
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>
          <Button onClick={saveChanges}>Save</Button>
          <Button onClick={() => cancelChanges()}>Cancel</Button>
        </>
      ) : (
        <>
          <div className="profile__userInfo__data">
            <p>Username: {userData?.username}</p>
          </div>
          <div className="profile__userInfo__data">
            <p>First name: {userData?.firstName}</p>
          </div>
          <div className="profile__userInfo__data">
            <p>Last name: {userData?.lastName}</p>
          </div>
          <div className="profile__userInfo__data">
            <p>Email: {userData?.email}</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}
    </div>
  );
}

export default Profile;