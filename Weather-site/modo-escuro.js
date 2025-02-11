const modoEscuro = document.getElementById('modo-escuro');

//adiciona a classe modo-escuro nos elementos
function mudarModoEscuro() {
    document.body.classList.toggle('modo-escuro');
    document.querySelectorAll('.container').forEach(container => {
        container.classList.toggle('modo-escuro');
    });
    
    //salvar modo escuro
    const eEscuro = document.body.classList.contains('modo-escuro');
    localStorage.setItem('modoEscuro', eEscuro);
}

//carregar modo escuro
function carregarModoEscuro() {
    const eEscuro = localStorage.getItem('modoEscuro');
    if (eEscuro) {
        mudarModoEscuro();
    }
}

//event listener do click no icone
if (modoEscuro) {
    modoEscuro.addEventListener('click', mudarModoEscuro);
    document.addEventListener('DOMContentLoaded', carregarModoEscuro);
}
