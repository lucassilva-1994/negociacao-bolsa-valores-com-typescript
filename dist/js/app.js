import { NegociacaoController } from "./controllers/NegociacaoController.js";
const negociacaoController = new NegociacaoController();
const form = document.querySelector(".form");
form.addEventListener('submit', event => {
    event.preventDefault();
    negociacaoController.adiciona();
});
