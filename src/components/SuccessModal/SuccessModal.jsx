import "./SuccessModal.css";

function SuccessModal({ isOpen, setActiveModal, onClose }) {
  function handleSigninClick() {
    setActiveModal("login");
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal__text">Registration successfully completed!</h3>
        <button onClick={handleSigninClick} className="modal__signin-btn">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
