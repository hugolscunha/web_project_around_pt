//SEÇÃO PROFILE EDIT

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

//SEÇÃO ADD CARD

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

//-------------------------------------------------------------------------------------

// SESSÃO IMAGE POPUP

// Variáveis do popup de imagem
const imagePopup = document.querySelector(".popup_type_image"); // Variável da janela popup de imagem (hidden)
const imagePopupImage = imagePopup.querySelector(".popup__image"); // Variável da imagem do popup de imagem (a imagem que vai aparecer no popup)
const imagePopupCaption = imagePopup.querySelector(".popup__caption"); // Variável da legenda do popup de imagem (o texto que vai aparecer abaixo da imagem no popup)
const imagePopupCloseButton = imagePopup.querySelector(".popup__button_type_close"); // Variável do botão de fechar do popup de imagem

// Função de abrir popup de imagem com o nome e link da imagem do card clicado
function openImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  imagePopup.classList.add("popup__opened");
}

function closeImagePopup() {
  imagePopup.classList.remove("popup__opened");
}

// Eventos de fechar popup de imagem

imagePopupCloseButton.addEventListener("click", closeImagePopup);
imagePopup.addEventListener("mousedown", handleOverlayClick);

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

document.addEventListener("keydown", handleEscClose);

//----------------------------------------------------------------------------------

//SESSÃO ELEMENTES

// Cards iniciais (objeto com as chaves de cada card inicial)
const initialCards = [
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
const template = document.querySelector(".elements__template"); // Variável de toda seção do template
const cardArea = document.querySelector(".elements__cards"); // variavel de card inicial (um único)

// Função para criar novo card 
function createCard(name, link) {
  //Variavel  que pega o conteúdo do card para criação de novas variaveis dos elementos dentro do card
  const cardElement = template.content.querySelector(".elements__card").cloneNode(true); 

  // Variáveis criadas para cada elemento do card
  const cardImage = cardElement.querySelector(".elements__image"); // Seleciona imagem do card
  const cardText = cardElement.querySelector(".elements__text"); // Seleciona texto do card
  const cardTrashButton = cardElement.querySelector(".elements__button_type_trash"); // Seleciona botão de lixeira
  const cardLikeButton = cardElement.querySelector(".elements__button_type_like"); // Seleciona botão de like
  const buttonCardImage = cardElement.querySelector(".elements__image-button"); // Seleciona o botão que envolve a imagem para abri-la

  // Define conteúdo do card usando o objeto initial cards
  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;


  // Evento de deletar um card
  cardTrashButton.addEventListener("click", () => cardElement.remove());

  // Evento de curtir
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__button_type_like-active");
  });

  // Abrir janela de imagem
  buttonCardImage.addEventListener("click", () => {
    openImagePopup(name, link);
  });

  return cardElement;
}

// Adiciona os cartões iniciais
initialCards.forEach(({ name, link }) => {
  const card = createCard(name, link);
  cardArea.append(card);
});
//------------------------------------------

