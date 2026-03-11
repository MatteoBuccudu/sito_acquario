class ShopController < ApplicationController
  def index
    # Simuliamo un piccolo database di prodotti in memoria
    # In un'app reale, questi arriveranno da Product.all
    @categories = ["Tutti", "Kit Completi", "Sali e Minerali", "Biocondizionatori", "Test Acqua"]
    
    @all_products = [
      { id: 1, name: "Kit 'Acqua Cristallina' (Startup)", category: "Kit Completi", price: 89.90, image: "https://images.unsplash.com/photo-1595166415752-05459f42ccb3?auto=format&fit=crop&q=80&w=400&h=300", desc: "Biocondizionatore a rilascio graduale, fiale di batteri nitrificanti e test a reagente per NO2 e NO3. Tutto ciò che ti serve per trasformare l'acqua del rubinetto in un habitat sicuro in soli 7 giorni." },
      { id: 2, name: "Kit 'Foresta Sommersa' (Piante)", category: "Kit Completi", price: 120.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400&h=300", desc: "Substrato fertile, fertilizzante liquido con ferro chelato e pastiglie di oligoelementi. Nutri le tue piante dalle radici alle foglie. Ideale per chi cerca l'effetto Nature Aquarium." },
      { id: 3, name: "Sali Professionali (Osmosi)", category: "Sali e Minerali", price: 35.00, image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=400&h=300", desc: "Sali minerali bilanciati per ricostruire l'acqua da osmosi inversa. Indispensabili per mantenere il pH tra 6.5 e 7.5, perfetto per i Discus più esigenti." }
    ]

    @current_category = params[:category] || "Tutti"
    
    @products = if @current_category == "Tutti"
      @all_products
    else
      @all_products.select { |p| p[:category] == @current_category }
    end
  end
end
