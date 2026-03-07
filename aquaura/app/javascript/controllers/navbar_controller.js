import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["progress", "navbar", "panel", "overlay", "hammer", "link"]

    connect() {
        this.open = false
        if (this.hasProgressTarget) {
            this.progressTarget.style.display = 'none'
        }
    }

    disconnect() {
        this.closeMenu()
    }

    toggleMenu() {
        if (this.open) {
            this.closeMenu()
        } else {
            this.openMenu()
        }
    }

    openMenu() {
        this.open = true
        this.hammerTarget.classList.add('ham-open')
        this.hammerTarget.setAttribute('aria-expanded', 'true')
        this.panelTarget.classList.add('panel-open', 'mobile-panel-open')
        this.overlayTarget.classList.add('ov-open', 'overlay-open')
        document.body.classList.add('menu-locked')
    }

    closeMenu() {
        this.open = false
        if (this.hasHammerTarget) this.hammerTarget.classList.remove('ham-open')
        if (this.hasHammerTarget) this.hammerTarget.setAttribute('aria-expanded', 'false')
        if (this.hasPanelTarget) this.panelTarget.classList.remove('panel-open', 'mobile-panel-open')
        if (this.hasOverlayTarget) this.overlayTarget.classList.remove('ov-open', 'overlay-open')
        document.body.classList.remove('menu-locked')
    }

    setActive(event) {
        this.linkTargets.forEach(link => link.classList.remove('is-active'))
        event.currentTarget.classList.add('is-active')
    }

    // Handle window resize to close mobile menu if switching to desktop
    resize() {
        if (window.innerWidth >= 1024 && this.open) {
            this.closeMenu()
        }
    }
}
