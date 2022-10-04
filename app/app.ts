import { Negociacao } from "./models/Negociacao.js";

const negociacao = new Negociacao(new Date(), 100, 1000);
console.log(negociacao.volume);