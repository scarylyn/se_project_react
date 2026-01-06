import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      </div>
      <div className="sidebar__options">
        <p className="sidebar_edit-profile">Change profile data</p>
        <p className="sidebar_logout">Log Out</p>
      </div>
    </aside>
  );
}
