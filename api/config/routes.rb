Rails.application.routes.draw do
  resources :eventos
  resources :users, only: [:update, :destroy, :index]

  post "/register", to: "users#create"
  post "/login", to: "users#login"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
