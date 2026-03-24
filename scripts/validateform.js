



// // Função para criar novo card 
// function createCard(name, link) {
//   //Variavel  que pega o conteúdo do card para criação de novas variaveis dos elementos dentro do card
//   const cardElement = template.content.querySelector(".elements__card").cloneNode(true); 

//   // Variáveis criadas para cada elemento do card
//   const cardImage = cardElement.querySelector(".elements__image"); // Seleciona imagem do card
//   const cardText = cardElement.querySelector(".elements__text"); // Seleciona texto do card
//   const cardTrashButton = cardElement.querySelector(".elements__button_type_trash"); // Seleciona botão de lixeira
//   const cardLikeButton = cardElement.querySelector(".elements__button_type_like"); // Seleciona botão de like
//   const buttonCardImage = cardElement.querySelector(".elements__image-button"); // Seleciona o botão que envolve a imagem para abri-la

//   // Define conteúdo do card usando o objeto initial cards
//   cardImage.src = link;
//   cardImage.alt = name;
//   cardText.textContent = name;
// }