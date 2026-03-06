class GalleryController < ApplicationController
  def index
    # Simulazione portfolio di immagini di lusso
    @images = [
      { id: 1, url: "https://images.unsplash.com/photo-1595166415752-05459f42ccb3?auto=format&fit=crop&q=80&w=800&h=1000", title: "Forest Layout", style: "tall" },
      { id: 2, url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800&h=600", title: "Minimalist Reef", style: "wide" },
      { id: 3, url: "https://images.unsplash.com/photo-1522069213448-443a614da9b6?auto=format&fit=crop&q=80&w=600&h=600", title: "Iwagumi Classic", style: "square" },
      { id: 4, url: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=800&h=1200", title: "Deep Sea Coral", style: "tall" },
      { id: 5, url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800&h=600", title: "Nature Aquarium", style: "wide" },
      { id: 6, url: "https://images.unsplash.com/photo-1517596541655-70e0eeffcb1c?auto=format&fit=crop&q=80&w=600&h=600", title: "Jungle Style", style: "square" }
    ]
  end
end
