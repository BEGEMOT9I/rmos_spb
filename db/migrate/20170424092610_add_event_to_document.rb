class AddEventToDocument < ActiveRecord::Migration[5.0]
  def change
    add_reference :documents, :event, foreign_key: true
  end
end
