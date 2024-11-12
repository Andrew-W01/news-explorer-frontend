import { Children } from "react";
import "./ModalWithForm.css";

function ModalWithForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form action="" onSubmit={handleSubmit} className="modal__form"></form>
        {children}
        <div className="modal__buttons-container">
          <button
            className={`modal__submit modal__el_hovered ${
              !formValid ? "modal__submit_disabled" : ""
            }`}
            type="submit"
            disabled={`${!formValid ? "disabled" : ""}`}
          >
            {" "}
            {buttonText}
          </button>
          <button
            className={"modal__text-button modal__el_hovered"}
            type="button"
            onClick={altButtonClick}
          >
            <span className="modal__or">or</span> {altButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalWithForm;
