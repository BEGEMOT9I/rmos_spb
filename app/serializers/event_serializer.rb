class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :file, :categories, :documents, :description, :start_time
  has_many :external_documents
  has_many :documents

  def documents
    object.documents + object.external_documents
  end
end
