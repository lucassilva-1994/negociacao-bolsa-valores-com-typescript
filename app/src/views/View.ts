export abstract class View<T> {

    protected elemento: HTMLElement;
    private escape = false;

    constructor(seletor: string, escape?: boolean) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique se existe o seletor informado.`);
        }
        if (escape) {
            this.escape = escape;
        }
    }

    public update(model: T): void {
        const time01 = performance.now();
        let template = this.template(model);
        if (this.escape) {
            template = template
                .replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
        const time02 = performance.now();
        console.log(`O tempo de execução do método update é ${(time02-time01)/1000} segundos.`);
    }

    protected abstract template(model: T): string;
}