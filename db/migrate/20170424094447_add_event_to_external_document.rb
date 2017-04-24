class AddEventToExternalDocument < ActiveRecord::Migration[5.0]
  def change
    add_reference :external_documents, :event, foreign_key: true
  end
end
