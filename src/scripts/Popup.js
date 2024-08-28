export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.setEventListeners();

    
  }
  open() {
    const popupOpen = document.querySelector(this._popupSelector);
    popupOpen.classList.add("popup__show");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    const popupOpen = document.querySelector(this._popupSelector);
    popupOpen.classList.remove("popup__show");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    const popupOpen = document.querySelector(this._popupSelector);
    const closeButton = popupOpen.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    popupOpen.querySelector(".popup__overlay").addEventListener("click", () => {
      this.close();
    });
  }
}