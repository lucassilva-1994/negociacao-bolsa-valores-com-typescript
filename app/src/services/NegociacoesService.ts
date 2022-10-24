import { Negociacao } from "../models/Negociacao.js";
import { NegociacoesDoDia } from "../interface/NegociacaoDoDia.js";

export class NegociacoesService{
    public obterNegociacoesDoDia(): Promise<Negociacao[]>{
        //Consumindo a API através do Fetch Api
        return fetch('http://localhost:8080/dados')
        .then(res => res.json())
        .then((dados: NegociacoesDoDia[]) => {
           return dados.map(dadoDeHoje => {
               return new Negociacao(
                   new Date(), 
                   dadoDeHoje.vezes, 
                   dadoDeHoje.montante
                   );
           });
        });
    }
}