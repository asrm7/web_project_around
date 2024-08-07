import "./pages/index.css";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import {
  closeAll,
  handleEsc,
  initialCards,
  btnEdit,
  formProfile,
  btnAdd,
  elementArea,
  formElements,
  popupOverlays
  
} from "./scripts/utils.js";
import UserInfo from "./scripts/UserInfo.js";

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
