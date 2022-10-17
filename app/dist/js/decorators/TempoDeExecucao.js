export function tempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            const time01 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const time02 = performance.now();
            console.log(`O método ${propertyKey} teve o tempo de execução ${(time02 - time01 / 1000)} segundos.`);
            retorno;
        };
        return descriptor;
    };
}
