class CreateCategoriesEventsJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :categories_events, id: false do |t|
      t.integer :category_id
      t.integer :event_id
    end
 
    add_index :categories_events, :category_id
    add_index :categories_events, :event_id
  end
end
