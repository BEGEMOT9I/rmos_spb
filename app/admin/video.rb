ActiveAdmin.register Video do

  permit_params :title, :file

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
    f.inputs 'Видео' do
      f.input :title
      f.input :file, :as => :file
      f.input :file_cache, :as => :hidden
    end
    f.actions do
      f.action :submit, as: :button, label: 'Save'
      f.action :reset, as: :button, label: 'Cancel'
    end
  end
end