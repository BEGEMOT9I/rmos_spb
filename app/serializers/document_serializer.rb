class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :title, :file, :extension
end
