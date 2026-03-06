import { Controller } from "@hotwired/stimulus"

/*
  A sleek, robust Parallax effect.
  Usage: <div data-controller="parallax" data-parallax-speed-value="0.2">
*/
export default class extends Controller {
    static values = { speed: { type: Number, default: 0.15 } }

    connect() {
        this.updateParallax = this.updateParallax.bind(this)
        window.addEventListener("scroll", this.updateParallax, { passive: true })

        // Rendi il parallax performante
        this.element.style.willChange = "transform"

        this.updateParallax()
    }

    disconnect() {
        window.removeEventListener("scroll", this.updateParallax)
    }

    updateParallax() {
        // Calcoliamo lo scostamento dal centro dello schermo
        const rect = this.element.getBoundingClientRect()
        const centerY = window.innerHeight / 2
        const elCenterY = rect.top + rect.height / 2
        const diff = (elCenterY - centerY) * this.speedValue

        // Applichiamo la trasformazione usando 3d per forzare l'hardware acceleration
        this.element.style.transform = `translate3d(0, ${diff}px, 0)`
    }
}
