class Picture < ApplicationRecord
  mount_uploader :file, ImageUploader
end
