class AddBranchToPictures < ActiveRecord::Migration[5.0]
  def change
    add_reference :pictures, :branch, foreign_key: true
  end
end
