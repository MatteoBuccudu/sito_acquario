Rails.application.routes.draw do
  root "pages#home"
  
  # Altre rotte che implementeremo in seguito
  get "/shop", to: "shop#index"
  get "/servizi", to: "services#index"
  post "/servizi", to: "services#create"
  
  resources :blog, only: [:index, :show]
  
  get "/dashboard", to: "dashboard#index"
  get "/galleria", to: "gallery#index"
  
  get "up" => "rails/health#show", as: :rails_health_check
end
