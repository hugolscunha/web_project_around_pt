// Função de abrir popup
export function openPopup(popup){
    popup.classList.add("popup__opened");
}

// Função de fechar popup 
export function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

// Fecha o popup ao clicar no overlay (chamado pelos eventListeners de cada popup)
export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    evt.target.classList.remove("popup__opened");
  }
}

// Fecha o popup ao clicar na tecla Esc (chamado pelo eventListener de toda a página)
export function handleEscClose(evt) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
    document.querySelectorAll(".popup__opened").forEach(popup => {
      popup.classList.remove("popup__opened");
    });
  }
  });
  
}

