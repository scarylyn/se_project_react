import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  openEditProfileModal,
  signOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="profile">
      <SideBar
        value={currentUser}
        openEditProfileModal={openEditProfileModal}
        signOut={signOut}
      />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
      />
    </section>
  );
}
