import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function UserAvatar({
  handleAddClick,
  isLoggedIn,
  openRegistrationModal,
  openSignInModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  if (isLoggedIn && currentUser && currentUser._id) {
    const firstLetter = currentUser.name.charAt(0).toUpperCase();

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
          <p className="header__username">{currentUser.name}</p>
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
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
