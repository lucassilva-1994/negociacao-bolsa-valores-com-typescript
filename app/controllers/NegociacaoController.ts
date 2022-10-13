import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from '../models/Negociacoes.js';
import { NegociacoesView } from "../views/NegociacoesView.js";
import { MensagemView } from '../views/MensagemView.js';
import { DiasDaSemana } from "../enums/DiasDaSemana.js";

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
        if(!this.diaUtil(negociacao.data)){
            this.mensagemView.update("Negociações só podem ser feitos em dias úteis.");
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
        this.negociacoes.lista();
    }

    private diaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO 
        && data.getDay() < DiasDaSemana.SABADO;
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
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }

    private atualizaView():void{
            //Após adicionar uma nova negociação será chamado o método para atualizar a view
            this.negociacoesView.update(this.negociacoes);
            this.mensagemView.update("Negociação adicionada com sucesso.");
    }
}