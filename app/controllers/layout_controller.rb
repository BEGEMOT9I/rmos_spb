class LayoutController < ApplicationController
  layout 'layout'

  def index
    # if Branch.where(path: request.fullpath).count
    #   render 'layouts/layout'
    # else
    #   render 'errors/404', layout: false, status: 404
    render file: 'public/index.html'
  end
end
