import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.boundOnMouseMove = this.onMouseMove.bind(this)
    this.boundOnMouseLeave = this.onMouseLeave.bind(this)

    this.element.addEventListener('mousemove', this.boundOnMouseMove)
    this.element.addEventListener('mouseleave', this.boundOnMouseLeave)
  }

  disconnect() {
    this.element.removeEventListener('mousemove', this.boundOnMouseMove)
    this.element.removeEventListener('mouseleave', this.boundOnMouseLeave)
  }

  onMouseMove(e) {
    const rect = this.element.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    this.element.style.transform = `translate(${x}px, ${y}px)`
  }

  onMouseLeave() {
    this.element.style.transform = `translate(0px, 0px)`
    this.element.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    
    // Cleanup transition after it finishes
    clearTimeout(this.resetTimer)
    this.resetTimer = setTimeout(() => {
      this.element.style.transition = ''
    }, 600)
  }
}
