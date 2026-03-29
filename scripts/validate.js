export default class FormValidator {

  #config;
  #formElement;

  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;

  #inputList;
  #buttonElement;

  constructor(config, formElement) { // config é um objeto que contém as configurações para a validação do formulário, e formElement é o elemento do formulário que será validado
    this.#config = config; // Armazena a configuração passada para a classe
    this.#formElement = formElement; //  Armazena o elemento do formulário passado para a classe

    // Variáveis que selecionam as configurações específicas do objeto de configuração para facilitar o acesso a elas
    this.#inputSelector = this.#config.inputSelector; // Seletor para os inputs do formulário
    
    this.#submitButtonSelector = this.#config.submitButtonSelector; // Seletor para o botão de enviar do formulário
    this.#inactiveButtonClass = this.#config.inactiveButtonClass; // Classe para desabilitar o botão de enviar
    
    this.#inputErrorClass = this.#config.inputErrorClass; // Classe para mostrar o erro do input (ex: borda vermelha)
    this.#errorClass = this.#config.errorClass; // Classe para mostrar o span de erro do input (frase de erro)

    // Variáveis que retornam elementos html do formulário
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector)); // Pega de todos os inputs do formulário e faz um array
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);  // Variável do botão de enviar do formulário
  }
  
  #showInputError(inputElement, errorMessage){ // Paramentro inputElement é o input que está sendo verificado e errorMessage é a mensagem de erro que será exibida no span de erro
    const errorElement = this.#formElement.querySelector(`.popup__error_type_${inputElement.name}`); // Variável do span de erro correspondente ao input que está sendo verificado
    inputElement.classList.add(this.#inputErrorClass); // Adiciona a classe de erro ao input
    errorElement.textContent = errorMessage; // Define o texto de erro no span
    errorElement.classList.add(this.#errorClass); // Adiciona a classe para mostrar o span de erro (deixa ele visível)
  }

  // Método que esconde o erro
  #hideInputError(inputElement){ //Parametro inputElement é o input que está sendo verificado
    const errorElement = this.#formElement.querySelector(`.popup__error_type_${inputElement.name}`); // Pega o elemento html <span> de erro por cada nome
    inputElement.classList.remove(this.#inputErrorClass); // Retira a classe de erro ao input, adicionada pelo método anterior a esse
    errorElement.textContent = ""; // Limpa o texto de erro
    errorElement.classList.remove(this.#errorClass); // Retira a classe que faz o span de erro se tornar visível
  }

  // Valida um input
  #checkInputValidity(inputElement){ // 
    if(!inputElement.validity.valid){ 
      this.#showInputError(inputElement, inputElement.validationMessage); // Chama o método de mostrar erro (inputElement é o input e o inputElement.validationMessage é a menssagem de erro(erroMessage do showInputErro))
    } else {
      this.#hideInputError(inputElement); // Caso contrário chama a hideInputErro e o erro não aparece
    }
  }

  //Verifica na lista de inputs, se há algum inválido
  #hasInvalidInput(){
    return this.#inputList.some((input) => !input.validity.valid)
  }

  #toggleButtonState(){
    if(this.#hasInvalidInput()) {
      this.#buttonElement.disabled = true; // se há um input invalido ele desabilita o botão
      this.#buttonElement.classList.add(this.#inactiveButtonClass); // adiciona a classe que estiliza o botão a ficar desabilitado (cinza)
    } else {
      this.#buttonElement.disabled = false; // se não há nenhum invalido, ativa o botão
      this.#buttonElement.classList.remove(this.#inactiveButtonClass); // retira a classe que desativa botão
    }
  }

  resetValidation(){
    this.#toggleButtonState();
    this.#inputList.forEach((input) => {
      this.#hideInputError(input);
    });
  }

  #setEventListeners(){
    this.#toggleButtonState(); // ajusta botão quando o formulário abre

    this.#inputList.forEach((inputElement) => { //Percorre o array inputList (todos os inputs)
      inputElement.addEventListener("input", () => { //Escuta quando o usuário digita
        this.#checkInputValidity(inputElement); // Valida o campo em tempo real
        this.#toggleButtonState(); //atualiza o botão em tempo real
      });
    });
  }

  enableValidation() {
  this.#setEventListeners();
  }
}
