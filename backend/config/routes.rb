Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    resources :categories, only: [:index]
    resources :products, only: [:index, :create] do
      post "refetch", on: :member
    end
  end
end 
