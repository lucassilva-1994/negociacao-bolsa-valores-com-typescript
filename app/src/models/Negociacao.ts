import { Modelo } from "../interface/Modelo.js";


export class Negociacao implements Modelo<Negociacao>{
    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    public texto(): string{
        return `
        Data: ${this.data},
        Quantidade: ${this.quantidade},
        Valor: ${this.valor}`;
    }

    public static criaNegociacao(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const data = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(data, quantidade, valor);
    }

    public dataIgual(negociacao: Negociacao): boolean{
        return this.data.getDate() === negociacao.data.getDate()
         && this.data.getMonth() === negociacao.data.getMonth()
         && this.data.getFullYear() === negociacao.data.getFullYear()
    }
}