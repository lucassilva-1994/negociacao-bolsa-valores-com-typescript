export class View {
    constructor(seletor, escape) {
        this.escape = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique se existe o seletor informado.`);
        }
        if (escape) {
            this.escape = escape;
        }
    }
    update(model) {
        const time01 = performance.now();
        let template = this.template(model);
        if (this.escape) {
            template = template
                .replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
        const time02 = performance.now();
        console.log(`O tempo de execução do método update é ${(time02 - time01) / 1000} segundos.`);
    }
}
