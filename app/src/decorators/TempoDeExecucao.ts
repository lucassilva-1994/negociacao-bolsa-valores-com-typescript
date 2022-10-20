export function tempoDeExecucao(emSegundos: boolean = false){
    return function(target: any, propertyKey: string, descriptor:PropertyDescriptor){
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]){
            let divisor = 1;
            let unidade = "milisegundos";
            if(emSegundos){
                divisor = 1000;
                unidade = "segundos";
            }
            const time01 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const time02 = performance.now();
            console.log(`O método ${propertyKey} teve o tempo de execução ${divisor} ${unidade}.`);
            retorno;
        };
        return descriptor;
    }
}