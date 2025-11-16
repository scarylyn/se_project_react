import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__button" onClick={onAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}
