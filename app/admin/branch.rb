ActiveAdmin.register Branch do

  permit_params :path, :name

  index do
    selectable_column
    id_column
    column :name
    column :path
    actions
  end

  show do
    attributes_table do
      row :name
      row :path
    end
  end

  form do |f|
    f.inputs 'Филиал' do
      f.input :name
      f.input :path
    end
    f.actions do
      f.action :submit, as: :button, label: 'Save'
      f.action :reset, as: :button, label: 'Cancel'
    end
  end
end