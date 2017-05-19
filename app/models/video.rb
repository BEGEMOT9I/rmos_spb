class Video < ApplicationRecord
  mount_uploader :file, VideoUploader

  def extension
    file&.file&.extension
  end
end
