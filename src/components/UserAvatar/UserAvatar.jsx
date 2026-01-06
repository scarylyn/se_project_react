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
        {/* handleAddClick doesn't work right now */}
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <p className="header__username">{value.name}</p>
        {value.avatar ? (
          <img src={value.avatar} alt={value.name} className="header__avatar" />
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
