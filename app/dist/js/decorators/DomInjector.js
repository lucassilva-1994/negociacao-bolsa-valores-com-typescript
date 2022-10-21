export function DomInjector(selector) {
    return function (target, propertyKey) {
        const getter = function () {
            const elemento = document.querySelector(selector);
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
