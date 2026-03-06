import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static classes = ["reveal"]

    connect() {
        // If the user prefers reduced motion, just show the element immediately
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            this.element.classList.add(...this.revealClasses)
            return
        }

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            root: null,
            rootMargin: "0px 0px -100px 0px", // Trigger slighly before bottom
            threshold: 0.1
        })

        this.observer.observe(this.element)
    }

    disconnect() {
        if (this.observer) this.observer.disconnect()
    }

    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Applica le classi Tailwind (es: opacity-100, translate-y-0)
                this.element.classList.add(...this.revealClasses)
                // Disattiva l'observer
                this.observer.unobserve(this.element)
            }
        })
    }
}
