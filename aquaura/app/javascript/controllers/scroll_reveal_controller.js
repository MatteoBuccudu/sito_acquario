import { Controller } from "@hotwired/stimulus"

// HTML usage:
// <div data-controller="scroll-reveal" data-scroll-reveal-class="opacity-100 translate-y-0" class="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
export default class extends Controller {
    static classes = ["reveal"] // data-scroll-reveal-reveal-class="opacity-100 translate-y-0"

    connect() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.reveal(entry.target)
                    // Unobserve if we only want to animate once
                    this.observer.unobserve(entry.target)
                }
            })
        }, {
            threshold: 0.1, // trigger when 10% is visible
            rootMargin: "0px 0px -50px 0px"
        })

        this.observer.observe(this.element)
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect()
        }
    }

    reveal(target) {
        // Se l'utente non ha specificato una reveal class custom, usiamo dei default
        const revealClasses = this.hasRevealClass
            ? this.revealClass.split(" ")
            : ["opacity-100", "translate-y-0", "scale-100"]

        // Rimuoviamo le classi di partenza (nascoste) tipiche
        target.classList.remove("opacity-0", "translate-y-10", "translate-y-20", "scale-95")

        // Aggiungiamo le classi di rivelazione
        target.classList.add(...revealClasses)
    }
}
