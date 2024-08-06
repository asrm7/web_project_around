import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import {
  closeAll,
  handleEsc,
  initialCards,
  
} from "./utils.js";
import UserInfo from "./UserInfo.js";
const btnEdit = document.querySelector(".profile__edit");
const formProfile = document.querySelector("#profile-form");
const btnAdd = document.querySelector(".profile__add");
const elementArea = document.querySelector(".elements");
const formElements = document.querySelector("#elements-form");
const popupOverlays = document.querySelectorAll(".popup__overlay");

const userInfo = new UserInfo({
  name: ".profile__info",
  title: ".profile__title",
});

const popupProfile1 = new PopupWithForm("#popup-profile", (inputs) => {
  userInfo.setUserInfo( inputs.nome, inputs.title );
  popupProfile1.close();
});


btnEdit.addEventListener("click", function () {
  popupProfile1.open();
});

const popupAddCard = new PopupWithForm("#popup-add", ({ link, place }) => {
   const popupImage = new PopupWithImage("#popup-img");
   console.log(place);
   const cardNode = new Card(place, link, popupImage.handleCardClick);
   elementArea.prepend(cardNode.generateCard());
   popupAddCard.close();
   
});

btnAdd.addEventListener("click", function () {
  popupAddCard.open();
});  

//Inicia cards
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const popupImage = new PopupWithImage("#popup-img");
      const card = new Card(item.name, item.link, popupImage.handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
      popupImage.setEventListeners();
    },
  },
  elementArea
);
cardList.renderItems();



popupOverlays.forEach((overlay) => {
  overlay.addEventListener("click", closeAll);
  document.removeEventListener("keydown", handleEsc);
});

const validateForm1 = new FormValidator(formElements, {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
const validateForm2 = new FormValidator(formProfile, {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
validateForm1.enableValidation();
validateForm2.enableValidation();
