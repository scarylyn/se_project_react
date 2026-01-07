import { NavLink } from "react-router-dom";

function UserAvatar({
  value,
  handleAddClick,
  isLoggedIn,
  openRegistrationModal,
  openSignInModal,
}) {
  if (isLoggedIn && value && value._id) {
    const firstLetter = value.name.charAt(0).toUpperCase();

    return (
      <div className="header__user-container">
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <NavLink className="header__nav-link" to="/profile">
          <p className="header__username">{value.name}</p>
          {value.avatar ? (
            <img
              src={value.avatar}
              alt={value.name}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar-placeholder">{firstLetter}</div>
          )}
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="header__user-container">
        <button
          className="header__add-clothes-btn"
          onClick={openRegistrationModal}
        >
          Sign Up
        </button>
        <button className="header__add-clothes-btn" onClick={openSignInModal}>
          Sign In
        </button>
      </div>
    );
  }
}

export default UserAvatar;
