class CreateDocumentsEventsJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :documents_events, id: false do |t|
      t.integer :document_id
      t.integer :event_id
    end
 
    add_index :documents_events, :document_id
    add_index :documents_events, :event_id
  end
end
