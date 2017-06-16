class Picture < ApplicationRecord
  mount_uploader :file, ImageUploader

  belongs_to :branch
end
