import { Controller } from "@hotwired/stimulus"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

// Registriamo il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default class extends Controller {
  connect() {
    console.log("Animations controller connected!")
    this.initAnimations()
    this.initTextRotation()
  }

  initAnimations() {
    // 1. Animazione degli elementi con classe .reveal
    const reveals = this.element.querySelectorAll(".reveal")
    
    reveals.forEach((el) => {
      // Configuriamo l'animazione di ingresso: fade-up (dal basso verso l'alto)
      gsap.fromTo(el, 
        { 
          opacity: 0, 
          y: 50 
        }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Inizia quando la cima dell'elemento arriva all'85% della viewport
            toggleActions: "play none none none" // Riproduci solo una volta
          }
        }
      )
    })

    // 2. Animazione "stagger" per le griglie o liste (es. carte del blog)
    const staggers = this.element.querySelectorAll(".stagger-reveal")
    staggers.forEach((container) => {
      const children = container.children
      if (children.length > 0) {
        gsap.fromTo(children,
          { 
            opacity: 0, 
            y: 30 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15, // Ritardo tra un elemento e l'altro
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%"
            }
          }
        )
      }
    })

    // 3. Animazione per immagini con effetto zoom
    const zoomReveals = this.element.querySelectorAll(".zoom-reveal")
    zoomReveals.forEach((el) => {
      gsap.fromTo(el,
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%"
          }
        }
      )
    })
    // 4. Forza il ricalcolo delle posizioni
    ScrollTrigger.refresh()
  }

  initTextRotation() {
    const rotators = this.element.querySelectorAll(".text-rotate")
    
    rotators.forEach((rotator) => {
      const spans = rotator.querySelectorAll("span")
      if (spans.length === 0) return

      // Prepariamo gli span: posizionamento assoluto per sovrapporli
      rotator.style.position = "relative"
      rotator.style.display = "flex"
      rotator.style.justifyContent = "center"
      rotator.style.alignItems = "center"

      spans.forEach((span, index) => {
        gsap.set(span, { 
          position: "absolute",
          opacity: 0,
          y: 20,
          filter: "blur(10px)"
        })
      })

      const tl = gsap.timeline({ repeat: -1 })

      spans.forEach((span, index) => {
        tl.to(span, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out"
        })
        .to(span, {
          opacity: 0,
          y: -20,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power3.in",
          delay: 2 // Tempo di permanenza del testo
        })
      })
    })
  }
}
