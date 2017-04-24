module ApplicationHelper
  def json_data()
    Rails.cache.fetch("rmos_spb") do
      {
        categories: ActiveModelSerializers::SerializableResource.new(Category.all).as_json,
        events: ActiveModelSerializers::SerializableResource.new(Event.order(:start_time).all).as_json,
        documents: ActiveModelSerializers::SerializableResource.new(Document.all).as_json,
        musics: ActiveModelSerializers::SerializableResource.new(Music.all).as_json,
        pictures: ActiveModelSerializers::SerializableResource.new(Picture.all).as_json,
        videos: ActiveModelSerializers::SerializableResource.new(Video.all).as_json
      }.to_json.to_s
    end
  end
end
