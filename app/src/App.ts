import { NegociacaoController } from './controllers/NegociacaoController.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o form existe.');
}

const buttonImport = document.querySelector('#button-import');
if(buttonImport){
    buttonImport.addEventListener("click", ()=>{
        controller.importData();
    });
} else{
    throw Error("Button-import não foi encontrado.");
}
