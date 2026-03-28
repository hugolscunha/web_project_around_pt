
// Classe Card para criar novos cards a partir do template
export default class Card {

  #name;
  #image;
  #templateSelector;
  #handleImageClick;

  #element;
  #likeBtn;
  #trashBtn;
  #imageBtn;
  #cardImage;
  #cardText;
  
  // Construtor da classe Card que recebe um objeto com as chaves name e link para criar um novo card
  constructor(cardData, templateSelector, handleImageClick) {
    this.#name = cardData.name;
    this.#image = cardData.link;
    this.#templateSelector = templateSelector;
    this.#handleImageClick = handleImageClick;
  }

  // Método para obter o template do card (tags do HTML) e clonar para criar um novo card
  #getTemplate() {
    const cardElement = document
      .querySelector(this.#templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
   
      return cardElement;
  }

  // Método para curtir o card (adiciona ou remove a classe de like ativo)
  #handleLike() {
    this.#likeBtn.classList.toggle("elements__button_type_like-active");
  }

  // Método para deletar o card (remove o elemento do DOM)
  #handleDelete() {
    this.#element.remove();
  }

    // Método para adicionar os eventListeners de cada card (curtir, deletar e abrir imagem)
  #setEventListeners() {
    this.#likeBtn.addEventListener("click", () => this.#handleLike());
    this.#trashBtn.addEventListener("click", () => this.#handleDelete());
    this.#imageBtn.addEventListener("click", () => this.#handleImageClick(this.#name, this.#image));
  }

    // Método para gerar o card com os dados do objeto e os elementos do template e adicionar os eventListeners de cada card
  generateCard() {
    this.#element = this.#getTemplate();

    this.#likeBtn = this.#element.querySelector(".elements__button_type_like");
    this.#trashBtn = this.#element.querySelector(".elements__button_type_trash");
    this.#imageBtn = this.#element.querySelector(".elements__image-button");
    this.#cardImage = this.#element.querySelector(".elements__image");
    this.#cardText = this.#element.querySelector(".elements__text");

    this.#cardImage.src = this.#image;
    this.#cardImage.alt = this.#name;
    this.#cardText.textContent = this.#name;

    this.#setEventListeners();

    return this.#element;
  }
}
