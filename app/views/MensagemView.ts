import { View } from './View.js';

export class MensagemView extends View<string>{
    template(model: string): string{
        return `
            <p class="alert alert-primary">${model}</p>
        `;
    }
}