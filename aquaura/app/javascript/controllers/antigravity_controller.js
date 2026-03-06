import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="antigravity"
export default class extends Controller {
    connect() {
        this.createBubbles()
        // Animazione periodica
        this.intervalId = setInterval(() => {
            this.createBubble()
        }, 400) // crea una bolla ogni meno di mezzo secondo
    }

    disconnect() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }

    createBubbles() {
        // Bolle iniziali
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createBubble(), Math.random() * 2000)
        }
    }

    createBubble() {
        const bubble = document.createElement("div")

        // Dimensioni random tra 10px e 60px
        const size = Math.random() * 50 + 10

        // Posizione orizzontale random (10% - 90%)
        const leftPos = Math.random() * 80 + 10

        // Durata dell'emergenza
        const animDuration = Math.random() * 10 + 5

        bubble.style.width = `${size}px`
        bubble.style.height = `${size}px`
        bubble.style.left = `${leftPos}%`
        bubble.className = "absolute bottom-[-100px] rounded-full bg-white opacity-20 filter blur-[2px] pointer-events-none"

        // Animazione custom keyframe via JS
        bubble.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.1 },
            { opacity: 0.3, offset: 0.3 },
            { transform: `translateY(-${window.innerHeight + 200}px) scale(${1 + Math.random() * 0.5})`, opacity: 0 }
        ], {
            duration: animDuration * 1000,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards'
        })

        this.element.appendChild(bubble)

        // Pulizia del DOM
        setTimeout(() => {
            if (this.element.contains(bubble)) {
                bubble.remove()
            }
        }, animDuration * 1000)
    }
}
