class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :file, :extension
end
