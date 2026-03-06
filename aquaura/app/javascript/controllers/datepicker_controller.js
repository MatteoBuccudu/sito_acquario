import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="datepicker"
export default class extends Controller {
    connect() {
        // Imposta la data minima a oggi per evitare prenotazioni nel passato
        const today = new Date();
        const tzOffset = today.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(today - tzOffset)).toISOString().split('T')[0];

        this.element.setAttribute('min', localISOTime);

        // Possiamo aggiungere classi Tailwind o DaisyUI dinamicamente 
        // quando il datepicker viene cliccato per renderlo ancora più integrato.
        this.element.addEventListener('focus', () => {
            this.element.classList.add('ring-2', 'ring-primary');
        });

        this.element.addEventListener('blur', () => {
            this.element.classList.remove('ring-2', 'ring-primary');
        });
    }
}
