ActiveAdmin.register AdminUser do
  permit_params :email, :password, :password_confirmation, :branch_id

  controller do
    def scoped_collection
      AdminUser.where(branch: current_admin_user.branch)
    end
  end

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    column :branch
    actions
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs "Admin Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :branch
    end
    f.actions
  end

end
