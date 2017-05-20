class Music < ApplicationRecord
  mount_uploader :file, MusicUploader
  belongs_to :event

  def extension
    file&.file&.extension
  end
end
