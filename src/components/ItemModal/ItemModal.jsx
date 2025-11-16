import "./ItemModal.css";
import closeIcon from "../../assets/x.svg";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const deleteItem = () => {
    onDelete(card);
  };

  return (
    <div
      onClick={onClose}
      className={`modal ${activeModal === "preview" && "modal__opened"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_preview"
        >
          <img src={closeIcon} alt="close icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={deleteItem}
            type="button"
            className="modal__button_delete"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
