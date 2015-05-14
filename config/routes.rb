Rails.application.routes.draw do
  resources :places

  resources :pictures

  resources :stories

  resources :users

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  root 'display#index'

end
