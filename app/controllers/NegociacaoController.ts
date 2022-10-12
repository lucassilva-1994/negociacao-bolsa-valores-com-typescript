import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from '../models/Negociacoes.js';
import { NegociacoesView } from "../views/NegociacoesView.js";
import { MensagemView } from '../views/MensagemView.js';

export class NegociacaoController{
    private inputData:HTMLInputElement;
    private inputQuantidade:HTMLInputElement;
    private inputValor:HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");

    constructor(){
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona():void{
        const negociacao = this.criarNegociacao();
        //getDay recebe valores de 0 a 6, onde 0 é no domingo e 6 é no sabádo.
        if(negociacao.data.getDay() > 0 && negociacao.data.getDay() < 6){
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
        } else {
            this.mensagemView.update("Negociações só podem ser realizados em dias úteis.");
        }

        this.negociacoes.lista();
    }

    private criarNegociacao(): Negociacao{
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp,','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date,quantidade,valor);
    }

    private limparFormulario(): void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView():void{
            //Após adicionar uma nova negociação será chamado o método para atualizar a view
            this.negociacoesView.update(this.negociacoes);
            this.mensagemView.update("Negociação adicionada com sucesso.");
    }
}