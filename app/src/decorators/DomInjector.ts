export function DomInjector(selector: string){
    return function (target: any, propertyKey: string){
        const getter = function(){
            const elemento = document.querySelector(selector);
            return elemento;
        }

        Object.defineProperty(target,propertyKey,{get: getter});
    }
}