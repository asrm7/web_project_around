import Api from "./scripts/api.js";
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
  popups
  
} from "./scripts/utils.js";
import UserInfo from "./scripts/UserInfo.js";
import PopupWithConfirmation from "./scripts/PopupWithConfirmation.js";

const userInfo = new UserInfo({
  name: ".profile__info",
  about: ".profile__title",
  avatar: ".profile__avatar",
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: " 55878f5d-532c-423a-a4a7-6c74dc5acc4e",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((result) => {
  userInfo.setUserInfo(result);

  api.getInitialCards().then((result) => {
    const cardList = new Section(
      {
        items: result,
        renderer: (item) => {
          const cards = new Card(
            item,

            () => {
              popupPicture.open(item.link, item.name);
            },
            userInfo._userId,
            () => {
              popupWithConfirmation.open(item._id);
            },
            () => api.addLike(item._id),
            () => api.removeLike(item._id)
          );
          const cardElement = cards.generateCard();

          cardList.addItem(cardElement);
        },
      },
      elementArea
    );

    cardList.renderItems();
  });
});

const popupAddCard = new PopupWithForm("#popup-add", (input) => {
  api.addcards(input).then((result) => {
    const newCard = new Card(
      result,
      () => {
        popupPicture.open(result.link, result.name);
      },

      userInfo._userId,
      () => {
        api.deleteCard(result._id);
        
      },

      (cardId) => api.addLike(cardId),
      (cardId) => api.removeLike(cardId)
    );
    const newCardElement = newCard.generateCard();
    cardArea.prepend(newCardElement);
    popupAddCard.close();
  });
});
popupAddCard.setEventListeners();


const popupProfile1 = new PopupWithForm("#popup-profile", (inputs) => {
  api.editProfile(inputs).then((result) => {
    userInfo.setUserInfo(result);
    popupProfile1.close();
  });
});
popupProfile1.setEventListeners();


const popupPicture = new PopupWithImage("#popup-img");
popupPicture.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  "#popup-delete-confirmation",
  (cardToDelete) => {
    api.deleteCard(cardToDelete).then(() => {
      popupWithConfirmation.close();
      const card = document.querySelector(`#id_${cardToDelete}`);
      card.remove();
    });
  }
);
popupWithConfirmation.setEventListeners();


btnEdit.addEventListener("click", function () {
  popupProfile1.open();
  popupProfile1.getUserInfo;
  validateForm1.enableValidation();
  
});
btnAdd.addEventListener("click", function () {
  popupAddCard.open();
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
