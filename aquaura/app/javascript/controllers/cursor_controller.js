import { Controller } from "@hotwired/stimulus"

// Tracks mouse position for the custom floating cursor
export default class extends Controller {
    static targets = ["dot"]

    connect() {
        this.mouseMoveHandler = this.move.bind(this)
        window.addEventListener("mousemove", this.mouseMoveHandler, { passive: true })
    }

    disconnect() {
        window.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    move(e) {
        // Use requestAnimationFrame for smoother hardware-accelerated movement
        requestAnimationFrame(() => {
            // The cursor dot is 32px wide/tall now, so subtract 16px to center
            this.element.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`
        })
    }
}
