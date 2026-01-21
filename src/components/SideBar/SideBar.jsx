import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ openEditProfileModal, signOut }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{currentUser.name}</p>
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
      </div>
      <div className="sidebar__options">
        <button
          className="sidebar__edit-profile"
          onClick={openEditProfileModal}
        >
          Change profile data
        </button>
        <button className="sidebar__logout" onClick={signOut}>
          Log Out
        </button>
      </div>
    </aside>
  );
}
