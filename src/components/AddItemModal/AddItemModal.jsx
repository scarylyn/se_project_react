import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    isSubmitted,
    handleSubmit: handleValidationSubmit,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          className={`modal__input${
            isSubmitted && errors.name ? " modal__input_invalid" : ""
          }`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.name && (
          <span className="modal__error modal__error_visible">
            {errors.name}
          </span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          name="imageUrl"
          className={`modal__input${
            isSubmitted && errors.imageUrl ? " modal__input_invalid" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.imageUrl && (
          <span className="modal__error modal__error_visible">
            {errors.imageUrl}
          </span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className={`modal__radio-input${
              isSubmitted && errors.weatherType ? " modal__input_invalid" : ""
            }`}
            name="weatherType"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className={`modal__radio-input${
              isSubmitted && errors.weatherType ? " modal__input_invalid" : ""
            }`}
            name="weatherType"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className={`modal__radio-input${
              isSubmitted && errors.weatherType ? " modal__input_invalid" : ""
            }`}
            name="weatherType"
            value="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
        {isSubmitted && errors.weatherType && (
          <span className="modal__error modal__error_visible">
            {errors.weatherType}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
