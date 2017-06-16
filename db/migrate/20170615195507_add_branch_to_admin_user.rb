class AddBranchToAdminUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :admin_users, :branch, foreign_key: true
  end
end
