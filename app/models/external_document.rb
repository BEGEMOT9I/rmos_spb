class ExternalDocument < ApplicationRecord
  mount_uploader :file, DocumentUploader
  belongs_to :event, touch: true

  before_save do |doc|
    self.title = doc.file.filename.sub(/\.\w*$/, '')
  end
end