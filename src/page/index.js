import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

import {
  editProfileButton,
  addButton,
  forms,
  cardData,
  validationConfig
} from "../utils/constants.js";

// ----- ESCUTADORES DE EVENTO DOS BOTÕES ADD E EDIT -----

editProfileButton.addEventListener("click", () => {
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// --------------------- USER INFOR -----------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description"
});

// --------------------- POPUP IMAGE ----------------------

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

// --------------------- FUNÇÃO CRIAR CARD --------------------------

function createCard(item) {
  const card = new Card(item, ".elements__template", (data) => {
    popupImage.open(data);
  });

  return card.generateCard();
}

// --------------------- SECTION -------------------------

const cardSection = new Section({ 
  items: cardData,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardSection.addItem(cardElement);
    }
  },
  ".elements__cards"
);

cardSection.renderItems();

// --------------------- POPUP EDIT PROFILE ------------------

const profilePopup = new PopupWithForm("#profile-popup", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    description: data.description
  });

  profilePopup.close();
});

profilePopup.setEventListeners();

// ------------------------- POPUP ADD CARD ---------------------------

const addCardPopup = new PopupWithForm("#add-popup", (data) => {
  const newCard = createCard({
    name: data.place,
    link: data.link
  });

  cardSection.addItem(newCard);
  addCardPopup.close();
});

addCardPopup.setEventListeners();

// -------------------- FORMS VALIDATION -------------------

forms.forEach((form) => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
});