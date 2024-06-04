// initialCards
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "./images/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "./images/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "./images/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/moved_lago.jpg",
  },
];

function renderCard(card) {
  const template = document
    .querySelector("#template")
    .content.querySelector(".elements__card");

  const currentCard = template.cloneNode(true);

  currentCard.querySelector(".elements__card-name").textContent = card.name;

  currentCard
    .querySelector(".elements__card-image")
    .setAttribute("src", card.link);

  currentCard
    .querySelector(".elements__card-image")
    .setAttribute("alt", card.name);

  currentCard
    .querySelector(".elements__like-icon")
    .setAttribute("src", "./images/like-button.png");

  return currentCard;
}

const elements = document.querySelector(".elements");

initialCards.forEach((card, index) => {
  const cardItem = renderCard(card);
  elements.append(cardItem);
});

// popupOpenAndCloseButton
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");

  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });
});

popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    popup.classList.remove("popup_opened");
  }
});

const saveButton = document.querySelector("#save-button");

saveButton.addEventListener("click", handleSaveProfileInformation);

function handleSaveProfileInformation(e) {
  e.preventDefault();
  const input1 = document.querySelector("#input-name");
  const input2 = document.querySelector("#input-role");
  const profileName = document.querySelector(".profile__name");
  const profileRole = document.querySelector(".profile__role");
  const newName = input1.value;
  const newRole = input2.value;

  input1.innerText = newName;
  input2.innerText = newRole;

  profileName.textContent = newName;
  profileRole.textContent = newRole;
  popup.classList.remove("popup_opened");
}
