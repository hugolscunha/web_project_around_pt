export default class FormValidator {
  constructor(config, formElement) { // config é um objeto que contém as configurações para a validação do formulário, e formElement é o elemento do formulário que será validado
    this._config = config; // Armazena a configuração passada para a classe
    this._formElement = formElement; //  Armazena o elemento do formulário passado para a classe

    // Variáveis que selecionam as configurações específicas do objeto de configuração para facilitar o acesso a elas
    this._inputSelector = this._config.inputSelector; // Seletor para os inputs do formulário
    
    this._submitButtonSelector = this._config.submitButtonSelector; // Seletor para o botão de enviar do formulário
    this._inactiveButtonClass = this._config.inactiveButtonClass; // Classe para desabilitar o botão de enviar
    
    this._inputErrorClass = this._config.inputErrorClass; // Classe para mostrar o erro do input (ex: borda vermelha)
    this._errorClass = this._config.errorClass; // Classe para mostrar o span de erro do input (frase de erro)

    // Variáveis que retornam elementos html do formulário
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); // Pega de todos os inputs do formulário e faz um array
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);  // Variável do botão de enviar do formulário
  }
  
  _showInputError(inputElement, errorMessage){ // Paramentro inputElement é o input que está sendo verificado e errorMessage é a mensagem de erro que será exibida no span de erro
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`); // Variável do span de erro correspondente ao input que está sendo verificado   
    inputElement.classList.add(this._inputErrorClass); // Adiciona a classe de erro ao input
    errorElement.textContent = errorMessage; // Define o texto de erro no span
    errorElement.classList.add(this._errorClass); // Adiciona a classe para mostrar o span de erro (deixa ele visível)
  }

  // Método que esconde o erro
  _hideInputError(inputElement){ //Parametro inputElement é o input que está sendo verificado
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`); // Pega o elemento html <span> de erro por cada nome
    inputElement.classList.remove(this._inputErrorClass); // Retira a classe de erro ao input, adicionada pelo método anterior a esse
    errorElement.textContent = ""; // Limpa o texto de erro
    errorElement.classList.remove(this._errorClass); // Retira a classe que faz o span de erro se tornar visível
  }

  // Valida um input
  _checkInputValidity(inputElement){ // 
    if(!inputElement.validity.valid){ 
      this._showInputError(inputElement, inputElement.validationMessage); // Chama o método de mostrar erro (inputElement é o input e o inputElement.validationMessage é a menssagem de erro(erroMessage do showInputErro))
    } else {
      this._hideInputError(inputElement); // Caso contrário chama a hideInputErro e o erro não aparece
    }
  }

  //Verifica na lista de inputs, se há algum inválido
  _hasInvalidInput(){
    return this._inputList.some((input) => !input.validity.valid)
  }

  _toggleButtonState(){
    if(this._hasInvalidInput()) {
      this._buttonElement.disabled = true; // se há um input invalido ele desabilita o botão
      this._buttonElement.classList.add(this._inactiveButtonClass); // adiciona a classe que estiliza o botão a ficar desabilitado (cinza)
    } else {
      this._buttonElement.disabled = false; // se não há nenhum invalido, ativa o botão
      this._buttonElement.classList.remove(this._inactiveButtonClass); // retira a classe que desativa botão
    }
  }

  resetValidation(){
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _setEventListeners(){
    this._toggleButtonState(); // ajusta botão quando o formulário abre

    this._inputList.forEach((inputElement) => { //Percorre o array inputList (todos os inputs)
      inputElement.addEventListener("input", () => { //Escuta quando o usuário digita
        this._checkInputValidity(inputElement); // Valida o campo em tempo real
        this._toggleButtonState(); //atualiza o botão em tempo real
      });
    });
  }

  enableValidation() {
  this._setEventListeners();
  }
}