export function tempoDeExecucao(emSegundos = false) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = "milisegundos";
            if (emSegundos) {
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
    };
}
//# sourceMappingURL=TempoDeExecucao.js.map