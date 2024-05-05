import "./ProfileAvatar.css";

function ProfileAvatar({ onClick }) {
  //TODO: Add condition for user with avatar
  const imgSrc = "/profile-avatar-empty.webp";

  return (
    <div className="profile__avatar" onClick={onClick}>
      <img
        src={imgSrc}
        alt="User Avatar"
        className="profile__avatar__image"
        width="50px"
      />
    </div>
  );
}

//TODO: Add PropTypes

export default ProfileAvatar;
