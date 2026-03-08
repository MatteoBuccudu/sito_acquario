import { Controller } from "@hotwired/stimulus"

/**
 * NavbarController – Aquaura Luxury Redesign (Debug version)
 */
export default class extends Controller {
    static targets = ["bar", "progress", "mobileDialog", "burger"]

    static values = {
        scrollThreshold: { type: Number, default: 60 },
        reducedMotion: { type: Boolean, default: false }
    }

    connect() {
        this._abortController = new AbortController()
        const { signal } = this._abortController

        this._prefersReducedMotion =
            this.reducedMotionValue ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches

        window.addEventListener("scroll", this._onScroll.bind(this), { passive: true, signal })
        document.addEventListener("keydown", this._onKeydown.bind(this), { signal })
        document.addEventListener("turbo:load", this._onTurboLoad.bind(this), { signal })

        this._setupIntersectionObserver()
        this._setupSwipe(signal)

        this._updateNavbar(window.scrollY)
        this._scheduleWillChangeCleanup()
    }

    disconnect() {
        this._abortController?.abort()
        this._observer?.disconnect()
        this._wipCleanupTimer && clearTimeout(this._wipCleanupTimer)
    }

    _setupSwipe(signal) {
        if (!this.hasMobileDialogTarget) return

        let touchStartX = 0
        this.mobileDialogTarget.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX
        }, { passive: true, signal })

        this.mobileDialogTarget.addEventListener("touchend", (e) => {
            const touchEndX = e.changedTouches[0].screenX
            if (touchEndX < touchStartX - 60) {
                this.closeMobileMenu()
            }
        }, { passive: true, signal })
    }

    _onScroll() {
        if (this._rafPending) return
        this._rafPending = true
        requestAnimationFrame(() => {
            this._updateNavbar(window.scrollY)
            this._rafPending = false
        })
    }

    _updateNavbar(scrollY) {
        if (this.hasProgressTarget && !this._prefersReducedMotion) {
            const total = document.documentElement.scrollHeight - document.documentElement.clientHeight
            if (total > 0) {
                this.progressTarget.style.transform = `scaleX(${scrollY / total})`
            }
        }

        if (this.hasBarTarget) {
            const isScrolled = scrollY > this.scrollThresholdValue
            this.barTarget.classList.toggle("navbar--scrolled", isScrolled)
            this.barTarget.style.setProperty("--navbar-max-w", isScrolled ? "1240px" : "1400px")
            this.barTarget.style.marginTop = isScrolled ? "8px" : ""
        }
    }

    _setupIntersectionObserver() {
        const hero = document.querySelector("[data-hero]") || document.body.firstElementChild
        if (!hero) return

        this._observer = new IntersectionObserver(
            ([entry]) => {
                this.barTarget?.classList.toggle("navbar--past-hero", !entry.isIntersecting)
            },
            { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
        )
        this._observer.observe(hero)
    }

    openMobileMenu() {
        if (!this.hasMobileDialogTarget) return

        // Forza lo stato di apertura
        this.mobileDialogTarget.classList.add("modal-open")
        this.mobileDialogTarget.classList.add("is-open")
        this.burgerTarget?.classList.add("is-open")

        // Usa showModal per il comportamento nativo
        try {
            if (!this.mobileDialogTarget.open) {
                this.mobileDialogTarget.showModal()
            }
        } catch (e) {
            console.warn("Failed to showModal", e)
        }

        this.burgerTarget?.setAttribute("aria-expanded", "true")
        this.mobileDialogTarget.style.willChange = "transform, opacity"
        setTimeout(() => { this.mobileDialogTarget.style.willChange = "" }, 700)
    }

    async closeMobileMenu() {
        if (!this.hasMobileDialogTarget) return

        this.mobileDialogTarget.classList.add("is-closing")
        this.mobileDialogTarget.classList.remove("modal-open")
        this.mobileDialogTarget.classList.remove("is-open")
        this.burgerTarget?.classList.remove("is-open")

        // Attendi l'animazione di uscita
        await new Promise(resolve => setTimeout(resolve, 300))

        try {
            if (this.mobileDialogTarget.open) {
                this.mobileDialogTarget.close()
            }
        } catch (e) {
            console.warn("Failed to close dialog", e)
        }

        this.mobileDialogTarget.classList.remove("is-closing")
        this.burgerTarget?.focus()
        this.burgerTarget?.setAttribute("aria-expanded", "false")
    }

    openSearch() {
        this.dispatch("search:open", { bubbles: true })
        const searchModal = document.getElementById("search-modal")
        searchModal?.showModal?.()
    }

    _onKeydown(event) {
        if (event.key === "Escape" && this.hasMobileDialogTarget && this.mobileDialogTarget.open) {
            this.closeMobileMenu()
        }
    }

    _onTurboLoad() {
        this._updateNavbar(window.scrollY)
    }

    _scheduleWillChangeCleanup() {
        this._wipCleanupTimer = setTimeout(() => {
            if (this.hasProgressTarget) {
                window.addEventListener("scrollend", () => {
                    if (this.hasProgressTarget) this.progressTarget.style.willChange = "auto"
                }, { signal: this._abortController.signal })
            }
        }, 2000)
    }
}
