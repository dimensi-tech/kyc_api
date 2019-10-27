Rails.application.routes.draw do
  root to: 'form#kyc'
  post 'form/post_passport'
  post 'form/post_identity'

  resources :locations, only: :index, defaults: { format: 'json' } do
    member do
      get 'cities'
      get 'districts'
      get 'urban_villages'
    end
  end
end
