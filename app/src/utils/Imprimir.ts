import { Imprimivel } from './Imprimivel.js';

export function Imprimir(...objetos: Array<Imprimivel>){
    for(let objeto of objetos){
        console.log(objeto.texto());
    }
}