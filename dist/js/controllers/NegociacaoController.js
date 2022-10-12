import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from '../models/Negociacoes.js';
import { NegociacoesView } from "../views/NegociacoesView.js";
import { MensagemView } from '../views/MensagemView.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = this.criarNegociacao();
        //getDay recebe valores de 0 a 6, onde 0 é no domingo e 6 é no sabádo.
        if (negociacao.data.getDay() > 0 && negociacao.data.getDay() < 6) {
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
        }
        else {
            this.mensagemView.update("Negociações só podem ser realizados em dias úteis.");
        }
        this.negociacoes.lista();
    }
    criarNegociacao() {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        //Após adicionar uma nova negociação será chamado o método para atualizar a view
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso.");
    }
}
