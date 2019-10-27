class Identity < ApplicationRecord
  has_many :passports
  belongs_to :city
  belongs_to :province
  belongs_to :district
  belongs_to :urban_village

  validates :nik, :name, :birth_place, :birth_date, :address,
            :province_id, :city_id, :district_id, :urban_village_id,
            :rt, :rw, :religion, :martial_status, :occupation, presence: true
end
