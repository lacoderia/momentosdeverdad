Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :places do
    member do
      post 'active'
    end
    collection do
      get 'by_lat_long'
      get 'available'
    end
  end

  resources :pictures

  resources :stories do
    member do
      post 'active'
      post 'mark'
    end
    collection do
      get 'by_place'
    end
  end

  resources :users

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  root 'display#index'
  get "share", :to => "display#index"

end
