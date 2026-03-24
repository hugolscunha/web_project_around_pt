import Card from "./card.js";

//SEÇÃO FORMULARIO PROFILE EDIT
// Variáveis da sessão profile
const editProfilePopup = document.querySelector("#profile"); // Variável da janela popup de edição de perfil(hidden)
const editProfileButton = document.querySelector("#edit-button"); // Botão com simbolo de caneta para abrir popup de edição
const closeEditButton = editProfilePopup.querySelector(".popup__button_type_close"); // Botão de fechar o popup de edição de perfil
const formElement = editProfilePopup.querySelector(".popup__form"); // Variável do formulário (tag form) do popup de edição de perfil
const submitButton = formElement.querySelector(".popup__button_type_send"); // Variável do botão de enviar do popup de edição de perfil

const profileInputs = formElement.querySelectorAll(".popup__item"); // Variável de todos os inputs do popup de edição de perfil
const nameInput = formElement.querySelector(".popup__item_type_name"); // Variável do input de nome do popup de edição de perfil
const aboutInput = formElement.querySelector(".popup__item_type_about"); // Variável do input de descrição do popup de edição de perfil

const profileName = document.querySelector(".profile__name"); // Variável do nome do perfil (o que vai aparecer no perfil depois de editado)
const profileAbout = document.querySelector(".profile__description"); // Variável da descrição do perfil (o que vai aparecer no perfil depois de editado)

// Funções de fechar popup de edição de perfil
function closeProfilePopup() {
  editProfilePopup.classList.remove("popup__opened");
}

// EventListeners de abrir popup de edição de perfil
editProfileButton.addEventListener("click", () => {
  editProfilePopup.classList.add("popup__opened");
  toggleButtonState(profileInputs, submitButton); // Verifica o estado do botão de enviar ao abrir o popup para garantir que ele esteja desabilitado se os campos estiverem vazios
});

// EventListener de fechar popup de edição de perfil
closeEditButton.addEventListener("click", closeProfilePopup);

// Verfica os inputs a cada digitação para mostrar ou esconder o span de erro e controlar o botão de enviar do popup de edição de perfil
 profileInputs.forEach((input)=> {
  input.addEventListener("input", () => {
    validateInput(formElement, input);
    toggleButtonState(profileInputs, submitButton);
  });
});

// Adiciona evento de submissão do formulário de perfil para alterar o perfil
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeProfilePopup();
});

//----------------------------------------------------------------------------------

// SESSÃO DE FORMULÁRIO DE ADIÇÃO DE CARD
// Variáveis da sessão add-card
const addPopup = document.querySelector("#add-popup"); // Variável da janela de adicionar card (hidden)
const addButton = document.querySelector("#add-button"); // Botão de adicionar card (+)
const closeAddButton = addPopup.querySelector(".popup__button_type_close"); // Botão de fechar popup addcard
const addForm = document.querySelector("#add-form"); // Variável do formulário (tag form) do popup de adição de card

const submitAddButton = addForm.querySelector(".popup__button_type_send"); // Variável do botão de enviar do popup de adição de novo lugar

const addInputs = addForm.querySelectorAll(".popup__item"); // Variável de todos os inputs do popup de adição de novo lugar
const localNameInput = addForm.querySelector(".popup__item_type_name"); // Variável do input de nome do popup de adição de novo lugar
const linkInput = addForm.querySelector(".popup__item_type_link"); // Variável do input de link da imagem do popup de adição de novo lugar

// Função de fechar popup de adição de card
function closeAddPopup() {
  addPopup.classList.remove("popup__opened");
};

// EventListener de abrir o popup de adição de card
addButton.addEventListener("click", () => {
  addPopup.classList.add("popup__opened");
  toggleButtonState(addInputs, submitAddButton); // Verifica o estado do botão de enviar ao abrir o popup para garantir que ele esteja desabilitado se os campos estiverem vazios
});

// EventListener de fechar popup de adição de card
closeAddButton.addEventListener("click", closeAddPopup);

// Verfica os inputs a cada digitação para mostrar ou esconder o span de erro e controlar o botão de enviar do popup de edição de perfil
 addInputs.forEach((input)=> {
  input.addEventListener("input", () => {
    validateInput(addForm, input);
    toggleButtonState(addInputs, submitAddButton);
  });
});

// Evento de submissão do formulário de adição de card para criar um novo card
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

const newCard = createCard(localNameInput.value, linkInput.value);
cardArea.prepend(newCard);

addForm.reset(); // Reseta o formulário para limpar os campos e o estado do botão de enviar
toggleButtonState(addInputs, submitAddButton); // Reseta o estado do botão de enviar para desabilitado
closeAddPopup();
});


// FUNÇÕES COMUNS PARA OS DOIS FORMULARIOS DE POPUP (EDITAR PERFIL E ADICIONAR CARD)

// COMUM  Validação dos inputs para ver se mostra o span de erro ou não (chamado pelo forEach dos inputs)
function validateInput(form, input) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  errorElement.textContent = input.validity.valid ? "" : input.validationMessage;
};

// COMUM Verifica se tem algum input inválido para controlar o botão de enviar do popup de edição de perfil
function hasInvalidInput(inputList) {
 return Array.from(inputList).some(input => !input.validity.valid);
};

// COMUM Controla botão de enviar do popup de edição de perfil (chamado pelo forEach dos inputs)
function toggleButtonState(inputList, buttonElement) {
  buttonElement.disabled = hasInvalidInput(inputList);
};

// COMUM Fecha o popup ao clicar no overlay (chamado pelos eventListeners de cada popup)
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    evt.target.classList.remove("popup__opened");
  }
}

editProfilePopup.addEventListener("mousedown", handleOverlayClick);
addPopup.addEventListener("mousedown", handleOverlayClick);

// COMUM Fecha o popup ao clicar na tecla Esc (chamado pelo eventListener de toda a página)
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup__opened").forEach(popup => {
      popup.classList.remove("popup__opened");
    });
  }
}

// EventListener para fechar o popup ao clicar na tecla Esc (escuta o evento de teclado em toda a página e fecha qualquer popup aberto)
document.addEventListener("keydown", handleEscClose);



//------------------------------------------------------------



// SESSÃO ELEMENTS (CARDS DE IMAGENS)
// Cards iniciais (objeto com as chaves de cada card inicial)
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

// Seleciona o template e o container de cards
const cardArea = document.querySelector(".elements__cards"); // Variável do container onde os cards vão ser inseridos

cardData.forEach(({ name, link }) => {
  const card = new Card( { name, link }, ".elements__template", openImagePopup);
  const cardElement = card.generateCard();
  // card.setEventListeners();
  cardArea.append(cardElement);
});

function openImagePopup(name, link) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");
  const popupCloseButton = imagePopup.querySelector(".popup__button_type_close");

  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  popupCloseButton.addEventListener("click", () => {
    imagePopup.classList.remove("popup__opened");
  });

  imagePopup.classList.add("popup__opened");
}








