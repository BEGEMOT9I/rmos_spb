class AddBranchToMusics < ActiveRecord::Migration[5.0]
  def change
    add_reference :musics, :branch, foreign_key: true
  end
end
