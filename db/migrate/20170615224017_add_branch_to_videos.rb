class AddBranchToVideos < ActiveRecord::Migration[5.0]
  def change
    add_reference :videos, :branch, foreign_key: true
  end
end
