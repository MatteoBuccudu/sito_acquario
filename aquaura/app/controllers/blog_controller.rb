class BlogController < ApplicationController
  def index
    @articles = [
      { id: 1, title: "L'Arte del Layout Iwagumi", summary: "Come posizionare le rocce per creare profondità e tensione visiva.", image: "https://images.unsplash.com/photo-1522069213448-443a614da9b6?auto=format&fit=crop&q=80&w=800&h=400" },
      { id: 2, title: "I Segreti del Ciclo dell'Azoto", summary: "Tutto ciò che devi sapere prima di inserire il tuo primo pesce.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800&h=400" }
    ]
  end

  def show
    # Mock article for demonstration
    @article = {
      title: "L'Arte del Layout Iwagumi",
      date: "12 Ottobre 2026",
      author: "Sergio, Il Dottore dell'Acqua",
      image: "https://images.unsplash.com/photo-1522069213448-443a614da9b6?auto=format&fit=crop&q=80&w=1200&h=600",
      content: "
        <p>L'Iwagumi (岩組) è uno degli stili di aquascaping più difficili ed eleganti. Creato dal maestro Takashi Amano, si basa sul principio della semplicità estrema e del posizionamento asimmetrico delle rocce.</p>
        <h2>La Regola d'Oro</h2>
        <p>In un vero Iwagumi, c'è sempre una pietra principale chiamata <strong>Oyaishi</strong>. Deve essere la roccia più grande e bella, posizionata secondo la regola dei terzi. Attorno ad essa ruotano le pietre di supporto (Fukuishi e Soeishi), creando un flusso visivo naturale e dinamico.</p>
        <blockquote>La natura non è mai simmetrica. L'asimmetria crea movimento, la simmetria crea stasi.</blockquote>
        <h3>La Scelta della Flora</h3>
        <p>Essendo un layout roccioso, la flora deve essere minimale per non rubare la scena alla texture della pietra. Spesso si usa solo <em>Hemianthus callitrichoides</em> o <em>Eleocharis parvula</em> per creare un prato verde uniforme che simuli le grandi distese collinari battute dal vento.</p>
      "
    }
  end
end
