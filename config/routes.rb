Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :places do
    member do
      post 'active'
    end
  end

  resources :pictures

  resources :stories do
    member do
      post 'active'
    end
  end

  resources :users

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  root 'display#index'

end
