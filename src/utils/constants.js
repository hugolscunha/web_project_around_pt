// VARIAVEIS 
export const editProfileButton = document.querySelector("#edit-button"); // Botão com simbolo de caneta para abrir popup de edição
export const addButton = document.querySelector("#add-button"); // Botão de adicionar card (+)
export const forms = document.querySelectorAll(".popup__form"); // Pega todos os formulários


// CARDS INICIAIS (objeto com as chaves de cada card inicial)
export const cardData = [
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

// VALIDATION CONFIG
export const validationConfig = {
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button_type_send",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__error_visible"
};