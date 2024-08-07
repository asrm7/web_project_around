import { closeAll, handleEsc } from "./utils.js";

export class Card {
  constructor(name, link, handleCardClick) {
    this._name = name;
    this._link = link;
    this._element = this._getTemplate();
    this.handleCardClick = handleCardClick;
    
    
  }
  _getTemplate() {
    return document
      .querySelector(".template__elements")
      .content.querySelector(".elements__container")
      .cloneNode(true);
  }
  _setProperties() {
    this._elementImage = this._element.querySelector(".elements__place-image");
    this._elementName = this._element.querySelector(".elements__text");
    this._likeBtn = this._element.querySelector(".elements__like");
    this._dltBtn = this._element.querySelector(".elements__delete");
    this._imgBtn = this._element.querySelector(".elements__place-image");
    this._fullImg = document.querySelector(".popup__fullImg");
    this._footerimg = document.querySelector(".popup__footer");
    this._elementImage.src = this._link;
    this._elementName.textContent = this._name;
    this._popupImg = document.querySelector("#popup-img");
  }

  _handleLike() {
    this._likeBtn.classList.toggle("elements__like-active");
  }
  _handleDelete() {
    this._element.remove();
  }
  handleOpenCard() {
    this.handleCardClick(this._name, this._link);
  }
  _setListeners() {
    this._likeBtn.addEventListener("click", () => this._handleLike());
    this._dltBtn.addEventListener("click", () => this._handleDelete());
    this._imgBtn.addEventListener("click", () => {
      this.handleOpenCard();
    });
    
  }

  
  generateCard() {
    this._setProperties();
    this._setListeners();
    return this._element;
  }
}
