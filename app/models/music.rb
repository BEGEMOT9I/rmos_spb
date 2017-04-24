class Music < ApplicationRecord
  mount_uploader :file, MusicUploader
  belongs_to :event
end
