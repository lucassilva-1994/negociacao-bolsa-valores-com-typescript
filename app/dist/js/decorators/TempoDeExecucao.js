export function tempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function () {
            const time01 = performance.now();
            const retorno = metodoOriginal();
            const time02 = performance.now();
            console.log(`${propertyKey}, tempo de execução ${(time02 - time01 / 1000)} segundos.`);
            retorno;
        };
        return descriptor;
    };
}
