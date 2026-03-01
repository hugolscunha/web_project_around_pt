# Tripleten web_project_around

**Around The Brazil** é projeto do curso de Desenvolvimento Web da TripleTen. Uma página web interativa que permite visualizar, adicionar  uma galeria de fotos de lugares visitados pelo Brasil. 

O utilizador pode interagir com as fotos, com funcionalidades para adicionar, remover e curtir as imagens (ainda não implementados neste estado) .

## Tecnologias Utilizadas
- HTML
- CSS
  - @font-face
  - Layouts responsivos 
- JavaScript
    - Interatividade
    - Manipulação do DOM

- Recursos de interatividade com JavaScript:
    - Abertura e fechamento de um modal de edição de perfil.
    - Atualização dinâmica do nome e da descrição do perfil.
    - Fechamento do modal ao pressionar a tecla "Esc" ou clicar fora da janela do modal.
    - Validação de formulários.

- Figma
  - Todo desenvolvimento foi feito com base em layouts feitos no Figma.

## Melhorias Futuras
- **Persistência de dados:** Atualmente, as alterações (como curtir fotos ou adicionar/remover) não são persistentes. A ideia é integrar um mecanismo de armazenamento local (Local Storage) ou um backend para guardar as interações do utilizador.
- **Acessibilidade:** Garantir que a página seja acessível a todos os utilizadores. Isso pode envolver melhorias no HTML, CSS (garantindo contraste adequado) e no JavaScript (tornando as interações acessíveis via teclado).
- **Modularização do JavaScript:** Organizar o código em módulos para melhor manutenção e escalabilidade.