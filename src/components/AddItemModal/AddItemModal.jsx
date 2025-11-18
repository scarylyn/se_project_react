import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
    resetForm();
    onClose();
  }

  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          required
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
            required
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
