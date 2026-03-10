import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["burger", "mobileOverlay", "progress"]

  connect() {
    this.menuOpen = false
    this.lastScrollY = window.scrollY

    this.onScroll = this.onScroll.bind(this)
    this.onKeydown = this.onKeydown.bind(this)
    this.onTurboLoad = this.onTurboLoad.bind(this)

    window.addEventListener('scroll', this.onScroll, { passive: true })
    document.addEventListener('keydown', this.onKeydown)
    document.addEventListener('turbo:load', this.onTurboLoad)

    this.updateNavbar(window.scrollY)
  }

  disconnect() {
    window.removeEventListener('scroll', this.onScroll)
    document.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('turbo:load', this.onTurboLoad)
  }

  onScroll() {
    this.updateNavbar(window.scrollY)
  }

  updateNavbar(scrollY) {
    if (this.hasProgressTarget) {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = height > 0 ? (scrollY / height) * 100 : 0
      this.progressTarget.style.width = `${progress}%`
    }

    if (scrollY > 50) {
      this.element.classList.add('scrolled')
      
      // Hide on scroll down, show on scroll up (only if menu is not open)
      if (scrollY > this.lastScrollY && !this.menuOpen) {
        this.element.classList.add('hidden-nav')
      } else {
        this.element.classList.remove('hidden-nav')
      }
    } else {
      this.element.classList.remove('scrolled', 'hidden-nav')
    }
    
    this.lastScrollY = scrollY
  }

  toggleMobileMenu() {
    this.menuOpen = !this.menuOpen
    
    if (this.hasBurgerTarget) {
      this.burgerTarget.classList.toggle('is-active', this.menuOpen)
      this.burgerTarget.setAttribute('aria-expanded', this.menuOpen)
    }

    if (this.hasMobileOverlayTarget) {
      this.mobileOverlayTarget.classList.toggle('is-open', this.menuOpen)
    }
    
    // Prevent body scroll
    document.body.style.overflow = this.menuOpen ? 'hidden' : ''
    
    // Reset navbar visibility overrides
    if (this.menuOpen) {
      this.element.classList.remove('hidden-nav', 'scrolled')
    } else if (window.scrollY > 50) {
      this.element.classList.add('scrolled')
    }
  }

  closeMobileMenu() {
    if (this.menuOpen) {
      this.toggleMobileMenu()
    }
  }

  onKeydown(e) {
    if (e.key === 'Escape' && this.menuOpen) {
      this.toggleMobileMenu()
    }
  }

  onTurboLoad() {
    this.updateNavbar(window.scrollY)
    // Close menu on navigation
    if (this.menuOpen) {
      this.toggleMobileMenu()
    }
  }
}
