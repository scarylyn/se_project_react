function UserAvatar({
  user,
  handleAddClick,
  isLoggedIn,
  openRegistrationModal,
  openSignInModal,
}) {
  if (isLoggedIn) {
    const firstLetter = user.name.charAt(0).toUpperCase();

    return (
      <div className="header__user-container">
        {/* handleAddClick doesn't work right now */}
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <p className="header__username">{user.name}</p>
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="header__avatar" />
        ) : (
          <div className="header__avatar-placeholder">{firstLetter}</div>
        )}
      </div>
    );
  } else {
    console.log("no user detected in UserAvatar");

    return (
      <div className="header__user-container">
        {/* TODO make these buttons function, adjust classNames */}
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
