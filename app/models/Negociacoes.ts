import { Negociacao } from './Negociacao.js';

export class Negociacoes{

    private negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void{
        this.negociacoes.push(negociacao);
    }

    lista(): Array<Negociacao>{
        return this.negociacoes;
    }
}