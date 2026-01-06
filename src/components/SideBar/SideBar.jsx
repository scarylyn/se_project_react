import "./SideBar.css";

export default function SideBar({ value, openEditProfileModal, signOut }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{value.name}</p>
        <img src={value.avatar} alt={value.name} className="sidebar__avatar" />
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
