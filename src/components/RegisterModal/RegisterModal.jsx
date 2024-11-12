import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";

const RegisterModal = ({
  isOpen,
  onClose,
  isLoading,
  setActiveModal,
  handleRegistration,
}) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation();

  const handleSubmit = () => {
    handleRegistration({ ...values, name: values.username }, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "", username: "" });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up" : "Sign up"}
      altButtonText={"or Sign in"}
      altButtonClick={() => setActiveModal("login")}
      isOpen={isOpen}
      onClose={onClose}
      formValid={isValid}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="email-login-register">
        Email
      </label>
      <input
        className="modal__input"
        id="email-login-register"
        name="email"
        type="email"
        minLength="4"
        maxLength="64"
        placeholder="Enter email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`modal__input-error ${
          errors.email ? "modal__input-error_visible" : ""
        }`}
        id="password-error"
      >
        {errors.email}
      </span>
      <label className="modal__label" htmlFor="password-login-register">
        Password
      </label>
      <input
        className="modal__input"
        id="password-login-register"
        name="password"
        type="password"
        placeholder="Enter password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`modal__input-error ${
          errors.password ? "modal__input-error_visible" : ""
        }`}
        id="password-error"
      >
        {errors.password}
      </span>
      <label className="modal__label" htmlFor="username-register">
        Username
      </label>
      <input
        className="modal__input"
        id="username-register"
        name="username"
        type="text"
        value={values.username || ""}
        placeholder="Enter your username"
        onChange={handleChange}
        required
      />
      <span
        className={`modal__input-error ${
          errors.username ? "modal__input-error_visible" : ""
        }`}
        id="password-error"
      >
        {errors.username}
      </span>
    </ModalWithForm>
  );
};

export default RegisterModal;
