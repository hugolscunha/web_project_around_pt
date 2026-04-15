import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit){
        super(selector);

        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputs = this._popup.querySelectorAll(".popup__item");
    }
    

    //coleta os dados dos inputs e criar um objeto e coloca essa lista criada dentro desse objeto
    _getInputValues() {
        const inputValues = {};

        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
