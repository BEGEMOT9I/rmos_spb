class Document < ApplicationRecord
  mount_uploader :file, DocumentUploader
  has_and_belongs_to_many :event
end
