class RemoveThumbnailFromVideo < ActiveRecord::Migration[5.0]
  def change
    remove_column :videos, :thumbnail, :string
  end
end
