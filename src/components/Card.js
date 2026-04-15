// Classe Card para criar novos cards a partir do template
export default class Card {
  constructor(cardData, templateSelector, handleImageClick) {
    this._name = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  // Método para obter o template do card (tags do HTML) e clonar para criar um novo card
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
   
      return cardElement;
  }

  // Método para curtir o card (adiciona ou remove a classe de like ativo)
  _handleLike() {
    this._likeBtn.classList.toggle("elements__button_type_like-active");
  }

  // Método para deletar o card (remove o elemento do DOM)
  _handleDelete() {
    this._element.remove();
  }

    // Método para adicionar os eventListeners de cada card (curtir, deletar e abrir imagem)
  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._handleLike());
    this._trashBtn.addEventListener("click", () => this._handleDelete());
    this._imageBtn.addEventListener("click", () => this._handleImageClick({
      name: this._name,
      link: this._image}));
  }

    // Método para gerar o card com os dados do objeto e os elementos do template e adicionar os eventListeners de cada card
  generateCard() {
    this._element = this._getTemplate();

    this._likeBtn = this._element.querySelector(".elements__button_type_like");
    this._trashBtn = this._element.querySelector(".elements__button_type_trash");
    this._imageBtn = this._element.querySelector(".elements__image-button");
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardText = this._element.querySelector(".elements__text");

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
