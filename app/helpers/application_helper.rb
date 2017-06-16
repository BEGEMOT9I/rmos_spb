module ApplicationHelper
  def json_data(branch)
    if branch
      {
        branch: {
          current: ActiveModelSerializers::SerializableResource.new(branch),
          default: ActiveModelSerializers::SerializableResource.new(Branch.find(Rails.application.config.DEFAULT_BRANCH))
        },
        categories: ActiveModelSerializers::SerializableResource.new(Category.all).as_json,
        events: ActiveModelSerializers::SerializableResource.new(Event.order(:start_time).where(branch: branch)).as_json,
        documents: ActiveModelSerializers::SerializableResource.new(Document.where(branch: branch)).as_json,
        musics: ActiveModelSerializers::SerializableResource.new(Music.where(branch: branch)).as_json,
        pictures: ActiveModelSerializers::SerializableResource.new(Picture.where(branch: branch)).as_json,
        videos: ActiveModelSerializers::SerializableResource.new(Video.where(branch: branch)).as_json
      }.to_json.to_s
    else
      default_branch = Branch.find(Rails.application.config.DEFAULT_BRANCH)

      {
        branch: {
          current: ActiveModelSerializers::SerializableResource.new(default_branch),
          default: ActiveModelSerializers::SerializableResource.new(default_branch)
        },
        categories: ActiveModelSerializers::SerializableResource.new(Category.all).as_json,
        events: ActiveModelSerializers::SerializableResource.new(Event.order(:start_time).where(branch: default_branch)).as_json,
        documents: ActiveModelSerializers::SerializableResource.new(Document.where(branch: default_branch)).as_json,
        musics: ActiveModelSerializers::SerializableResource.new(Music.where(branch: default_branch)).as_json,
        pictures: ActiveModelSerializers::SerializableResource.new(Picture.where(branch: default_branch)).as_json,
        videos: ActiveModelSerializers::SerializableResource.new(Video.where(branch: default_branch)).as_json
      }.to_json.to_s
    end
  end
end
