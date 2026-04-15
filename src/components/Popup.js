export default class Popup {    
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    //método que adiciona a classe para o popup ser visualizado
    open(){
        this._popup.classList.add("popup__opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    //método que retira a class css e fecha o popup
    close(){
        this._popup.classList.remove("popup__opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    //botão do esc para fechar
    _handleEscClose(evt){
        if (evt.key === "Escape") {
            this.close();
        }
    }

    //Listeners do popup
    setEventListeners(){
        //botão de fechar
        this._popup.
        querySelector(".popup__button_type_close").
        addEventListener("click",() => this.close());

        // overlay (quando clicar fora)
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}