import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import UserAvatar from "../UserAvatar/UserAvatar";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  openRegistrationModal,
  openSignInModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="header logo" className="header__logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <NavLink className="header__nav-link" to="/profile">
        <UserAvatar
          value={currentUser}
          isLoggedIn={isLoggedIn}
          handleAddClick={handleAddClick}
          openRegistrationModal={openRegistrationModal}
          openSignInModal={openSignInModal}
        />
      </NavLink>
    </header>
  );
}
export default Header;
