class MusicSerializer < ActiveModel::Serializer
  attributes :id, :title, :file, :extension
end
