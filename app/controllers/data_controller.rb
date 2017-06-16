class DataController < ApplicationController
  include ApplicationHelper
  
  def index
    render json: json_data(Branch.where(path: params[:branch]).first)
  end
end