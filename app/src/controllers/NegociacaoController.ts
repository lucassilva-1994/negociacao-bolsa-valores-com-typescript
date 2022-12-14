import { DomInjector } from '../decorators/DomInjector.js';
import { Inspect } from '../decorators/Inspect.js';
import { tempoDeExecucao } from '../decorators/TempoDeExecucao.js';
import { DiasDaSemana } from '../enums/DiasDaSemana.js';
import { Negociacao } from '../models/Negociacao.js';
import { Negociacoes } from '../models/Negociacoes.js';
import { NegociacoesService } from '../services/NegociacoesService.js';
import { MensagemView } from '../views/MensagemView.js';
import { NegociacoesView } from '../views/NegociacoesView.js';
import { Imprimir } from './../utils/Imprimir.js';

export class NegociacaoController {
    @DomInjector("#data")
    private inputData: HTMLInputElement;
    @DomInjector("#quantidade")
    private inputQuantidade: HTMLInputElement;
    @DomInjector("#valor")
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {

        this.negociacoesView.update(this.negociacoes);
    }

    @Inspect
    @tempoDeExecucao(true)
    public adiciona(): void {
        const negociacao = Negociacao.criaNegociacao(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );
     
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas.');
            return ;
        }

        this.negociacoes.adiciona(negociacao);
        Imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    }

    public importData(): void{
        this.negociacoesService.obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter(negociacoesDeHoje=>{
                return !this.negociacoes.lista()
                .some(negociacao => negociacao.dataIgual(negociacoesDeHoje));
            })
         })
         .then(negociacoesDeHoje => {
            for(let negociacao of negociacoesDeHoje){
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
         });
    }

    private diaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso.');
    }
}
