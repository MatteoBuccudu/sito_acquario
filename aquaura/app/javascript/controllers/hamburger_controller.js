import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="hamburger"
export default class extends Controller {
    connect() {
        this.handleFocusOut = this.handleFocusOut.bind(this)
        this.element.addEventListener('focusout', this.handleFocusOut)
    }

    disconnect() {
        this.element.removeEventListener('focusout', this.handleFocusOut)
    }

    handleFocusOut(event) {
        // We use setTimeout to let the DOM understand the new active element
        setTimeout(() => {
            // If the newly focused element is outside of our dropdown, we uncheck the hamburger checkbox
            if (!this.element.contains(document.activeElement)) {
                const checkbox = this.element.querySelector('input[type="checkbox"]')
                if (checkbox) checkbox.checked = false
            }
        }, 10)
    }
}
