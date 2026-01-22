import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  userData,
  clothingItems,
  onCardClick,
  onAddClick,
  openEditProfileModal,
  signOut,
  handleCardLike,
}) {
  return (
    <section className="profile">
      <SideBar
        userData={userData}
        openEditProfileModal={openEditProfileModal}
        signOut={signOut}
      />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        handleCardLike={handleCardLike}
      />
    </section>
  );
}
