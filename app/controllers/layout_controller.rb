class LayoutController < ApplicationController
  layout 'layout'

  def index
    render 'layouts/layout'
  end
end