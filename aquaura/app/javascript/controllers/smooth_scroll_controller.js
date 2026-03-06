import { Controller } from "@hotwired/stimulus"
import Lenis from "@studio-freight/lenis"

export default class extends Controller {
    connect() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing iconica di Awwwards
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        // Avvia il rAF loop per Lenis
        this.animationFrame = requestAnimationFrame(this.raf.bind(this))
    }

    disconnect() {
        if (this.lenis) {
            this.lenis.destroy()
        }
        cancelAnimationFrame(this.animationFrame)
    }

    raf(time) {
        this.lenis.raf(time)
        this.animationFrame = requestAnimationFrame(this.raf.bind(this))
    }
}
