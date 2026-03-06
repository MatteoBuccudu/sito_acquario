import { Controller } from "@hotwired/stimulus"

// L'animazione di uscita è gestita da CSS (animate-preloader-exit) per funzionare
// anche senza JavaScript. Questo controller rimuove l'elemento dal DOM dopo l'animazione.
export default class extends Controller {
    connect() {
        // Rimuoviamo il nodo dopo che l'animazione CSS è completata (2.3s)
        setTimeout(() => {
            if (this.element) {
                this.element.remove()
            }
        }, 2500)
    }
}

