ActiveAdmin.register Category do

  permit_params :title, :image, :color

  index do
    selectable_column
    id_column
    column :image do |f|
      image_tag(f.image_url, width: "40")
    end
    column :title
    actions
  end

  show do
    attributes_table do
      row :title
      row :image do |f|
        span(f.image_identifier)
        br()
        image_tag(f.image_url, width: "320")
      end
      row :color
    end
  end

  form do |f|
    f.inputs 'Категория' do
      f.input :title
      f.input :image, :as => :file
      f.input :image_cache, :as => :hidden
      f.input :color, :as => :color
    end
    f.actions do
      f.action :submit, as: :button, label: 'Save'
      f.action :reset, as: :button, label: 'Cancel'
    end
  end
end