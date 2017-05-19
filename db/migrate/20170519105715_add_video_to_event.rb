class AddVideoToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :video, :string
  end
end
