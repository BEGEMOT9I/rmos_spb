class ExternalDocument < ApplicationRecord
  mount_uploader :file, DocumentUploader
  belongs_to :event, touch: true

  before_save do |doc|
    doc.title = doc.file.filename.sub(/\.\w*$/, '')
  end

  def extension
    file&.file&.extension
  end
end