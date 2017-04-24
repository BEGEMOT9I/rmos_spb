class DataController < ApplicationController
  include ApplicationHelper
  
  def index
    render json: json_data()
  end
end