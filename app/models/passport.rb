class Passport < ApplicationRecord
  belongs_to :identity, optional: :true

  validates :full_name, :birth_place, :mother_name, :father_name, :number,
            :expired_date, :released_date, presence: true
end
