import { View } from './View.js';
export class MensagemView extends View {
    template(model) {
        return `
            <p class="alert alert-primary">${model}</p>
        `;
    }
}
