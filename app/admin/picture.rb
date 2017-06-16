ActiveAdmin.register Picture do

  permit_params :title, :file, :branch_id

  controller do
    def scoped_collection
      Picture.where(branch: current_admin_user.branch)
    end
  end

  index do
    selectable_column
    id_column
    column :title
    actions
  end

  show do
    attributes_table do
      row :title
      row :file do |f|
        span(f.file_identifier)
      end
    end
  end

  form do |f|
    f.inputs 'Изображение' do
      f.object.branch = current_admin_user.branch
      f.input :title
      f.input :file, :as => :file
      f.input :file_cache, :as => :hidden
      f.input :branch
    end
    f.actions do
      f.action :submit, as: :button, label: 'Save'
      f.action :reset, as: :button, label: 'Cancel'
    end
  end
end