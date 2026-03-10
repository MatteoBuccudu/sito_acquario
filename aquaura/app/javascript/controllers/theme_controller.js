import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="theme"
export default class extends Controller {
  static targets = ["checkbox"]

  connect() {
    this.applyTheme(this.currentTheme)
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.checked = this.currentTheme === "dark"
    }
  }

  toggle() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark"
    this.applyTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
  }

  get currentTheme() {
    return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  }
}
