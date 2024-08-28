import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
     this.getUserInfo();
    
  }
  getUserInfo(){
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    const name = document.querySelector(".profile__info").textContent;
    const about = document.querySelector(".profile__title").textContent;
    
    const inputValues =  {name, about};
    const inputForms = Array.from(form.elements);
    inputForms.forEach((element) => {
      if (element.name) {
        element.value =  inputValues[element.name];
      }
    });
  }
  getInputValues() {
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    const inputValues = {};
    const inputForms = Array.from(form.elements);
    inputForms.forEach((element) => {
      if (element.name) {
        inputValues[element.name] = element.value;
      }
    });
    return inputValues;
  }
  close() {
    super.close();
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.getInputValues());
      this.close();
    });
  }
}