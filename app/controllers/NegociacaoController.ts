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
    private negociacoesView = new NegociacoesView("#negociacoesView",true);
    private mensagemView = new MensagemView("#mensagemView");

    constructor(){
        this.inputData = <HTMLInputElement>document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona():void{
        const negociacao = Negociacao.criarNegociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
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