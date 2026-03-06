import { Controller } from "@hotwired/stimulus"

/*
  A controller to replicate the popular Awwwards "Text Mask Reveal" animation.
  It takes a text node, splits it by lines (or just wraps it), sets overflow-hidden
  on the outer wrapper, and translates the inner wrapper into view on scroll.
*/
export default class extends Controller {
    static values = {
        delay: { type: Number, default: 0 },
        duration: { type: Number, default: 1200 }, // ms
    }

    connect() {
        // 1. Wrap the current content in an outer mask and an inner slide element.
        const originalText = this.element.innerHTML

        // Clear and build DOM
        this.element.innerHTML = ""

        // Outer masks the overflow
        this.outerSpan = document.createElement("span")
        this.outerSpan.style.display = "inline-flex"
        this.outerSpan.style.overflow = "hidden"
        this.outerSpan.style.verticalAlign = "bottom"
        this.outerSpan.style.padding = "0.1em 0" // prevents cutting off descenders
        this.outerSpan.style.margin = "-0.1em 0"

        // Inner does the translating
        this.innerSpan = document.createElement("span")
        this.innerSpan.innerHTML = originalText
        this.innerSpan.style.display = "inline-flex"
        this.innerSpan.style.transform = "translateY(110%)"
        this.innerSpan.style.transition = `transform ${this.durationValue}ms cubic-bezier(0.19, 1, 0.22, 1) ${this.delayValue}ms`
        this.innerSpan.style.willChange = "transform"

        this.outerSpan.appendChild(this.innerSpan)
        this.element.appendChild(this.outerSpan)

        // 2. Setup IntersectionObserver
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.reveal()
                    this.observer.unobserve(entry.target)
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits exactly bottom
        })

        this.observer.observe(this.element)
    }

    disconnect() {
        if (this.observer) this.observer.disconnect()
    }

    reveal() {
        // requestAnimationFrame handles edge cases where transition applies before DOM paints
        requestAnimationFrame(() => {
            this.innerSpan.style.transform = "translateY(0%)"
        })
    }
}
