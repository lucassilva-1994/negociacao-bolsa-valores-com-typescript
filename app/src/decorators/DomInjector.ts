export function DomInjector(selector: string){
    return function (target: any, propertyKey: string){
        let elemento: HTMLElement;
        const getter = function(){
            if(!elemento){
                elemento = <HTMLElement>document.querySelector(selector);
                console.log(`Buscando elemento do DOM usando o seletor ${selector}
                  para injetar no ${propertyKey}.`);
            }
            return elemento;
        }

        Object.defineProperty(target,propertyKey,{get: getter});

    }
}