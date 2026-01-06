import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const RegisterModal = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {
    values,
    resetForm,
    errors,
    isValid,
    isSubmitted,
    handleSubmit: handleValidationSubmit,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegistration(data);
    const valid = handleValidationSubmit();
    if (!valid) return;
    resetForm();
    onClose();
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          className={`modal__input${
            isSubmitted && errors.email ? " modal__input_invalid" : ""
          }`}
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.email && (
          <span className="modal__error modal__error_visible">
            {errors.email}
          </span>
        )}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className={`modal__input${
            isSubmitted && errors.password ? " modal__input_invalid" : ""
          }`}
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.password && (
          <span className="modal__error modal__error_visible">
            {errors.password}
          </span>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{" "}
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
        Avatar URL*{" "}
        <input
          name="imageUrl"
          className={`modal__input${
            isSubmitted && errors.imageUrl ? " modal__input_invalid" : ""
          }`}
          id="imageUrl"
          placeholder="Avatar URL"
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
    </ModalWithForm>
  );
};

export default RegisterModal;
