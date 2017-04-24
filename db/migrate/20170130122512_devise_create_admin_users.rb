class DeviseCreateAdminUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :admin_users do |t|
    end
  end
end
