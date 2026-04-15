import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }
    
  // método que atribui os seus respectivos valores e chama o metodos do pai (Popup.js) de abrir o popup
  open({ name, link }) {
    this._image.src = link
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }


}
