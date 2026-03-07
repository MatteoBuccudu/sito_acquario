import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["progress", "navbar", "panel", "overlay", "hammer", "link"]

    connect() {
        this.open = false
        this.handleScroll = this.handleScroll.bind(this)
        window.addEventListener('scroll', this.handleScroll, { passive: true })
        this.handleScroll() // Initial check
    }

    disconnect() {
        window.removeEventListener('scroll', this.handleScroll)
        this.closeMenu()
    }

    handleScroll() {
        const s = window.scrollY
        const t = document.documentElement.scrollHeight - window.innerHeight

        if (this.hasProgressTarget) {
            this.progressTarget.style.width = (t > 0 ? s / t * 100 : 0) + '%'
        }

        if (this.hasNavbarTarget) {
            if (s > 40) {
                this.navbarTarget.style.background = 'rgba(8, 10, 15, 0.72)'
                this.navbarTarget.style.backdropFilter = 'blur(24px) saturate(160%) brightness(1.08)'
                this.navbarTarget.style.webkitBackdropFilter = 'blur(24px) saturate(160%) brightness(1.08)'
                this.navbarTarget.style.boxShadow = '0 1px 0 rgba(255, 255, 255, 0.055), 0 8px 32px rgba(0, 0, 0, .42)'
                this.navbarTarget.classList.add('top-0')
                this.navbarTarget.classList.remove('top-[2px]')
            } else {
                this.navbarTarget.style.background = ''
                this.navbarTarget.style.backdropFilter = ''
                this.navbarTarget.style.webkitBackdropFilter = ''
                this.navbarTarget.style.boxShadow = ''
                this.navbarTarget.classList.add('top-[2px]')
                this.navbarTarget.classList.remove('top-0')
            }
        }
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
