import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="countdown"
export default class extends Controller {
    static values = {
        targetDate: String // formato ISO, es: "2026-03-10T15:00:00"
    }

    static targets = ["days", "hours", "minutes", "seconds"]

    connect() {
        this.target = new Date(this.targetDateValue).getTime()

        // Fallback se la data è assente, imposta a 3 giorni da ora
        if (isNaN(this.target)) {
            this.target = new Date().getTime() + (3 * 24 * 60 * 60 * 1000)
        }

        this.update()
        this.interval = setInterval(() => this.update(), 1000)
    }

    disconnect() {
        clearInterval(this.interval)
    }

    update() {
        const now = new Date().getTime()
        const distance = this.target - now

        if (distance < 0) {
            clearInterval(this.interval)
            this.setValues(0, 0, 0, 0)
            return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        this.setValues(days, hours, minutes, seconds)
    }

    setValues(d, h, m, s) {
        if (this.hasDaysTarget) this.daysTarget.style.setProperty('--value', d)
        if (this.hasHoursTarget) this.hoursTarget.style.setProperty('--value', h)
        if (this.hasMinutesTarget) this.minutesTarget.style.setProperty('--value', m)
        if (this.hasSecondsTarget) this.secondsTarget.style.setProperty('--value', s)
    }
}
