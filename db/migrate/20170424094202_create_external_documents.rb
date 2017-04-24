class CreateExternalDocuments < ActiveRecord::Migration[5.0]
  def change
    create_table :external_documents do |t|
      t.string :title
      t.string :file

      t.timestamps
    end
  end
end
