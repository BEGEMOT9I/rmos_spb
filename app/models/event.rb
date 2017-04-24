class Event < ApplicationRecord
  mount_uploader :file, ImageUploader

  has_many :external_documents, dependent: :destroy

  has_and_belongs_to_many :categories
  has_and_belongs_to_many :documents

  accepts_nested_attributes_for :external_documents, allow_destroy: true
  accepts_nested_attributes_for :documents, allow_destroy: true
end
