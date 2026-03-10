import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["bar", "progress", "mobileOverlay", "burger"]

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

        this._rafPending = false
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

    // ─── Mobile Menu ─────────────────────────────────────────────────────────
    //
    // Nota: su alcuni device mobile (specie iOS/Safari) Stimulus può perdere
    // il target in situazioni particolari (es. cache Turbo, DOM rimosso e reinserito).
    // Per evitare che l'hamburger "non faccia nulla", usiamo un fallback
    // che cerca comunque l'overlay nel DOM se il target non è disponibile.

    _resolveOverlay() {
        if (this.hasMobileOverlayTarget) return this.mobileOverlayTarget
        return document.querySelector(".mobile-menu-overlay")
    }

    openMobileMenu() {
        const overlay = this._resolveOverlay()
        if (!overlay) return
        overlay.classList.add("is-open")
        overlay.setAttribute("aria-hidden", "false")

        if (this.burgerTarget) {
            this.burgerTarget.classList.add("is-open")
            this.burgerTarget.setAttribute("aria-expanded", "true")
        }

        // Blocca lo scroll del body
        document.body.style.overflow = "hidden"

        // Focus al primo link dopo animazione
        setTimeout(() => {
            const firstLink = overlay.querySelector("a")
            firstLink?.focus()
        }, 400)
    }

    closeMobileMenu() {
        const overlay = this._resolveOverlay()
        if (!overlay) return
        overlay.classList.remove("is-open")
        overlay.setAttribute("aria-hidden", "true")

        if (this.burgerTarget) {
            this.burgerTarget.classList.remove("is-open")
            this.burgerTarget.setAttribute("aria-expanded", "false")
        }

        // Ripristina lo scroll del body
        document.body.style.overflow = ""

        if (this.burgerTarget && document.body.contains(this.burgerTarget)) {
            this.burgerTarget.focus()
        }
    }

    // ─── Swipe ───────────────────────────────────────────────────────────────

    _setupSwipe(signal) {
        if (!this.hasMobileOverlayTarget) return

        let touchStartX = 0
        this.mobileOverlayTarget.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX
        }, { passive: true, signal })

        this.mobileOverlayTarget.addEventListener("touchend", (e) => {
            const touchEndX = e.changedTouches[0].screenX
            if (touchEndX < touchStartX - 60) {
                this.closeMobileMenu()
            }
        }, { passive: true, signal })
    }

    // ─── Scroll ──────────────────────────────────────────────────────────────

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

    // ─── Keyboard ────────────────────────────────────────────────────────────

    _onKeydown(event) {
        if (event.key === "Escape" && this.hasMobileOverlayTarget) {
            if (this.mobileOverlayTarget.classList.contains("is-open")) {
                this.closeMobileMenu()
            }
        }
    }

    // ─── Search ──────────────────────────────────────────────────────────────

    openSearch() {
        this.dispatch("search:open", { bubbles: true })
        const searchModal = document.getElementById("search-modal")
        searchModal?.showModal?.()
    }

    // ─── Turbo ───────────────────────────────────────────────────────────────

    _onTurboLoad() {
        this._updateNavbar(window.scrollY)
        // Chiudi il menu dopo la navigazione
        if (this.hasMobileOverlayTarget) {
            this.mobileOverlayTarget.classList.remove("is-open")
            this.mobileOverlayTarget.setAttribute("aria-hidden", "true")
            document.body.style.overflow = ""
        }
    }

    // ─── Cleanup ─────────────────────────────────────────────────────────────

    _scheduleWillChangeCleanup() {
        this._wipCleanupTimer = setTimeout(() => {
            if (this.hasProgressTarget && "onscrollend" in window) {
                window.addEventListener("scrollend", () => {
                    if (this.hasProgressTarget) this.progressTarget.style.willChange = "auto"
                }, { signal: this._abortController.signal })
            }
        }, 2000)
    }
}
