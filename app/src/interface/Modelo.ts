import { Imprimivel } from "../utils/Imprimivel.js";
import { Comparavel } from "./Comparavel.js";

export interface Modelo<T> extends Imprimivel, Comparavel<T>{
    
}