import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from '../models/Negociacoes.js';
import { NegociacoesView } from "../views/NegociacoesView.js";
import { MensagemView } from '../views/MensagemView.js';
import { DiasDaSemana } from "../enums/DiasDaSemana.js";
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
        const negociacao = Negociacao.criarNegociacao(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView.update("Negociações só podem ser feitos em dias úteis.");
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
        this.negociacoes.lista();
    }
    diaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }
    atualizaView() {
        //Após adicionar uma nova negociação será chamado o método para atualizar a view
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso.");
    }
}
