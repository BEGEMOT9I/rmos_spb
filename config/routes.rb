Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  Branch.all.map { |branch| get branch.path => 'layout#index' }

  get '/' => redirect(Branch.find(Rails.application.config.DEFAULT_BRANCH).path)
  
  get '/data' => 'data#index'
  root 'layout#index'
end
