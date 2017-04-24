class RemoveEventFromDocument < ActiveRecord::Migration[5.0]
  def change
    remove_reference :documents, :event, foreign_key: true
  end
end
