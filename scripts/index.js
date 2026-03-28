import Card from "./card.js";
import FormValidator from "./validate.js";
import { 
  openPopup,
  closePopup,
  handleOverlayClick, 
  handleEscClose 
} from "./util.js";

//PROFILE
// Variáveis do Profile
const editProfilePopup = document.querySelector("#profile"); // Variável da janela popup de edição de perfil(hidden)
const editProfileButton = document.querySelector("#edit-button"); // Botão com simbolo de caneta para abrir popup de edição
const closeEditButton = editProfilePopup.querySelector(".popup__button_type_close"); // Botão de fechar o popup de edição de perfil
const formElement = editProfilePopup.querySelector(".popup__form"); // Variável do formulário (tag form) do popup de edição de perfil
const nameInput = formElement.querySelector(".popup__item_type_name"); // Variável do input de nome do popup de edição de perfil
const aboutInput = formElement.querySelector(".popup__item_type_about"); // Variável do input de descrição do popup de edição de perfil
const profileName = document.querySelector(".profile__name"); // Variável do nome do perfil (o que vai aparecer no perfil depois de editado)
const profileAbout = document.querySelector(".profile__description"); // Variável da descrição do perfil (o que vai aparecer no perfil depois de editado)

// Abrir Popup Profile 
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});

// Fechar Popup Profile
closeEditButton.addEventListener("click", () => closePopup(editProfilePopup));

// Overlay
editProfilePopup.addEventListener("mousedown", handleOverlayClick);


//-------------------------------------------------------------------------------------------------------------------------------------------------------
// ADD CARD

// Variáveis da sessão add-card
const addPopup = document.querySelector("#add-popup"); // Variável da janela de adicionar card (hidden)
const addButton = document.querySelector("#add-button"); // Botão de adicionar card (+)
const closeAddButton = addPopup.querySelector(".popup__button_type_close"); // Botão de fechar popup addcard
const addForm = document.querySelector("#add-form"); // Variável do formulário (tag form) do popup de adição de card
const localNameInput = addForm.querySelector(".popup__item_type_name"); // Variável do input de nome do popup de adição de novo lugar
const linkInput = addForm.querySelector(".popup__item_type_link"); // Variável do input de link da imagem do popup de adição de novo lugar

// Abrir Popup Add
addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

// Fecha Popup Add
closeAddButton.addEventListener("click", () => closePopup(addPopup));

// Overlay
addPopup.addEventListener("mousedown", handleOverlayClick);

//ESC Global
handleEscClose();

//-------------------------------------------------------------------------------------------------------------------------------------------------------

//VALIDAÇÃO
const validationConfig = {
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button_type_send",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__error_visible"
};

const profileFormValidator = new FormValidator(validationConfig, formElement)
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

// EDIT PROFILE 
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(editProfilePopup);
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

//CARDS

// Seleciona o template e o container de cards
const cardArea = document.querySelector(".elements__cards"); // Variável do container onde os cards vão ser inseridos

// Função para criar novo card 
function createCard(name, link) {
  const card = new Card({ name, link }, ".elements__template", openImagePopup);
  return card.generateCard();
}

//Submit add card
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = createCard(localNameInput.value, linkInput.value);
  cardArea.prepend(newCard);

  addForm.reset();
  addFormValidator.toggleButtonState();
  closePopup(addPopup);
});

//------------------------------------------------------------

// CARDS INICIAIS (objeto com as chaves de cada card inicial)
const cardData = [
  {
    name: "Fernando de Noronha",
    link: "https://images.pexels.com/photos/11159713/pexels-photo-11159713.jpeg",
  },
  {
    name: "Gramado",
    link: "https://images.pexels.com/photos/18171957/pexels-photo-18171957.jpeg",
  },
  {
    name: "Manaus",
    link: "https://images.pexels.com/photos/29759408/pexels-photo-29759408.jpeg",
  },
  {
    name: "Rio de Janeiro",
    link: "https://images.pexels.com/photos/1458036/pexels-photo-1458036.jpeg",
  },
  {
    name: "Salvador",
    link: "https://images.pexels.com/photos/31792594/pexels-photo-31792594.jpeg",
  },
  {
    name: "São Paulo",
    link: "https://images.pexels.com/photos/72479/pexels-photo-72479.jpeg",
  },
];


cardData.forEach(({ name, link }) => {
  const card = new Card( { name, link }, ".elements__template", openImagePopup);
  const cardElement = card.generateCard();
  // card.setEventListeners();
  cardArea.append(cardElement);
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//POPUP IMAGEM
function openImagePopup(name, link) {
  const imagePopup = document.querySelector("#image-popup");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");
  const popupCloseButton = imagePopup.querySelector(".popup__button_type_close");

  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  popupCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
  });

  imagePopup.addEventListener("mousedown", handleOverlayClick)

  openPopup(imagePopup); 
}
