class Passport < ApplicationRecord
  mount_uploader :image, DocumentUploader

  belongs_to :identity, optional: :true

  validates :full_name, :birth_place, :mother_name, :father_name, :number,
            :expired_date, :released_date, :image, presence: true
end
