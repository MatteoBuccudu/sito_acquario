class ServicesController < ApplicationController
  def index
    # Form initialization
  end

  def create
    # Simulazione salvataggio della richiesta
    flash[:success] = "Richiesta ricevuta. Il Dottore dell'Acqua ti contatterà presto!"
    redirect_to servizi_path
  end
end
