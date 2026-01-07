import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => {
    if (!currentUser) {
      return false;
    } else {
      return id === currentUser._id;
    }
  });

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const onCardLike = () => {
    handleCardLike({ itemId: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button className={itemLikeButtonClassName} onClick={onCardLike} />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
