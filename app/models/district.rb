class District < ApplicationRecord
  belongs_to :city
  has_many :urban_villages
end
