class ShopController < ApplicationController
  def index
    # Simuliamo un piccolo database di prodotti in memoria
    # In un'app reale, questi arriveranno da Product.all
    @categories = ["Tutti", "Biocondizionatori", "Test Acqua", "Sali e Minerali"]
    
    @all_products = [
      { id: 1, name: "AquaSafe Elite", category: "Biocondizionatori", price: 24.90, image: "https://images.unsplash.com/photo-1595166415752-05459f42ccb3?auto=format&fit=crop&q=80&w=400&h=300", desc: "Rende le acque più dure setose e sicure in pochi secondi." },
      { id: 2, name: "Master Test Kit", category: "Test Acqua", price: 49.50, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400&h=300", desc: "Laboratorio completo per analisi chimiche di precisione (pH, NO2, NO3, NH3)." },
      { id: 3, name: "Pure Minerals", category: "Sali e Minerali", price: 18.00, image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=400&h=300", desc: "Reintegra oligoelementi essenziali per pesci discus e coralli." },
      { id: 4, name: "BioClear Pro", category: "Biocondizionatori", price: 32.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400&h=300", desc: "Batteri nitrificanti per un'incredibile limpidezza dell'acqua." },
    ]

    @current_category = params[:category] || "Tutti"
    
    @products = if @current_category == "Tutti"
      @all_products
    else
      @all_products.select { |p| p[:category] == @current_category }
    end
  end
end
