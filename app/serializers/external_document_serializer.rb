class ExternalDocumentSerializer < ActiveModel::Serializer
  attributes :id, :title, :file, :extension
end
