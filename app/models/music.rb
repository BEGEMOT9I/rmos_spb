class Music < ApplicationRecord
  mount_uploader :file, MusicUploader
  
  belongs_to :event
  belongs_to :branch

  def extension
    file&.file&.extension
  end
end
