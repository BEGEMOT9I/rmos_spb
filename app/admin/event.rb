ActiveAdmin.register Event do

  permit_params :title, :file, :video, :description, :external_documents, :start_time, external_documents_attributes: [:id, :file, :_destroy], category_ids: [], document_ids: []

  index do
    selectable_column
    id_column
    column :title
    column :start_time
    actions
  end

  show do
    attributes_table do
      row :title
      row :file do |event|
        span(event.file_identifier)
        br()
        image_tag(event.file_url, width: "320")
      end
      row :video do |event|
        if event.video.present?
          span(event.video_identifier)
          br()
          video_tag([event.video_url], width: "320", controls: true)
        end
      end
      row :categories do |event|
        span event.categories.pluck(:title).join(', ')
      end
      row :documents do |event|
        span event.documents.pluck(:title).join(', ')
      end
      row :external_documents do |event|
        span event.external_documents.pluck(:title).join(', ')
      end
      row :description
      row :start_time
      row :created_at
    end
  end

  form do |f|
    f.inputs 'Мероприятие' do
      f.input :title
      f.input :file, :as => :file, :hint => f.object.file.present? \
        ? image_tag(f.object.file.url(), width: 200)
        : content_tag(:span, "Нет изображения")
      f.input :file_cache, :as => :hidden
      f.input :video, :as => :file
      f.input :video_cache, :as => :hidden
      f.input :category_ids, collection: Category.all.map { |d| [d.title, d.id] }, multiple: 'multiple'
      f.input :document_ids, collection: Document.all.map { |d| [d.title, d.id] }, multiple: 'multiple'
      f.has_many :external_documents, allow_destroy: true do |ff|
        ff.input :file, label: ff.object&.file_identifier
      end
      f.label :description, class: 'label-desc'
      f.cktext_area :description, ckeditor: { language: 'ru'}
      f.input :start_time, :as => :date_time_picker
    end
    f.actions do
      f.action :submit, as: :button, label: 'Save'
      f.action :reset, as: :button, label: 'Cancel'
    end
  end
end