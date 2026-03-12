import { Controller } from "@hotwired/stimulus"

// L'animazione di uscita è gestita da CSS (animate-preloader-exit) per funzionare
// anche senza JavaScript. Questo controller rimuove l'elemento dal DOM dopo l'animazione.
export default class extends Controller {
    connect() {
        // Avviamo la transizione di dissolvenza dopo un breve ritardo
        setTimeout(() => {
            if (this.element) {
                this.element.classList.add('opacity-0')
                // Rimuoviamo il nodo dopo che l'animazione CSS è completata (1s come da classe duration-1000)
                setTimeout(() => {
                    this.element.remove()
                }, 1000)
            }
        }, 500) // Aspetta mezzo secondo prima di iniziare a sparire
    }
}

