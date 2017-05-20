class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :file, :video, :categories, :description, :start_time

  has_many :documents
  has_many :external_documents

  def video
    {
      extension: object.video&.file&.extension,
      thumb: object.video.thumb,
      url: object.video.url
    }
  end
end
