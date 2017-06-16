class Video < ApplicationRecord
  mount_uploader :file, VideoUploader

  belongs_to :branch

  def extension
    file&.file&.extension
  end
end
