class AddBranchToDocuments < ActiveRecord::Migration[5.0]
  def change
    add_reference :documents, :branch, foreign_key: true
  end
end
