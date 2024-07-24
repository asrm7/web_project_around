const popUpProfile = document.querySelector("#popup-profile");
const profileNameInput = document.querySelector("#input-name");
const profileAboutInput = document.querySelector("#input-title");
const elementLinkInput = document.querySelector("#input-link");
const elementNameInput = document.querySelector("#input-img");
const popUpAdd = document.querySelector("#popup-add");
const popupImg = document.querySelector("#popup-img");
const profileName = document.querySelector(".profile__info");
const profileAbout = document.querySelector(".profile__title");
const buttonSelector = document.querySelector(".popup__button-create");
const formProfile = document.querySelectorAll(".popup__error");
const inputSelector = document.querySelectorAll(".popup__input");

//open close profile profile                              class="input-title-error popup__error"
function openProfile() {
  popUpProfile.classList.toggle("popup__show");
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  document.addEventListener("keydown", handleEsc);
}
function closeAll() {
  popUpProfile.classList.remove("popup__show");
  elementLinkInput.value = "";
  elementNameInput.value = "";
  popUpAdd.classList.remove("popup__show");
  popupImg.classList.remove("popup__show");
  document.removeEventListener("keydown", handleEsc);
  formProfile.forEach(function (el) {
    el.textContent = "";
    el.classList.remove("popup__error_visible");
    el.classList.remove("popup__input_type_error");
  });
  inputSelector.forEach(function (el) {
    el.classList.remove("popup__error_visible");
    el.classList.remove("popup__input_type_error");
  });
  buttonSelector.classList.add("popup__button_disabled");
}
function handleEsc(evt) {
  if (evt.key === "Escape") {
    closeAll();
    console.log("Foi pressionado ESC");
  }
}
function saveChanges(evt) {
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  evt.preventDefault();
  closeAll();
}
function openAdd() {
  popUpAdd.classList.add("popup__show");
  document.addEventListener("keydown", handleEsc);
}

export { openProfile, closeAll, handleEsc, saveChanges, openAdd };
