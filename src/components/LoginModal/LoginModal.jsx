import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";

const LoginModal = ({
  isOpen,
  onClose,
  isLoading,
  setActiveModal,
  handleLogin,
}) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation();

  const handleSubmit = () => {
    handleLogin(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "" });
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText={isLoading ? "Signing in" : "Sign in"}
      altButtonText={"Sign up"}
      altButtonClick={() => setActiveModal("register")}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label className="modal__label" htmlFor="email-login">
        Email
      </label>
      <input
        className="modal__input"
        id="email-login"
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
        id="email-error"
      >
        {errors.email}
      </span>
      <label className="modal__label" htmlFor="password-login">
        Password
      </label>
      <input
        className="modal__input"
        id="password-login"
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
    </ModalWithForm>
  );
};

export default LoginModal;
