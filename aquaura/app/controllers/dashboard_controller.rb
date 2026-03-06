class DashboardController < ApplicationController
  def index
    # Simulazione dati parametri chimici per Chart.js
    @water_parameters = {
      labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      ph: [8.1, 8.1, 8.2, 8.1, 8.0, 8.1, 8.1],
      no3: [5, 5, 10, 15, 20, 5, 5], # Picco prima del cambio d'acqua
    }
    
    @days_since_water_change = 2 # Simulato
    @water_quality_score = 92 # Da 0 a 100
  end
end
