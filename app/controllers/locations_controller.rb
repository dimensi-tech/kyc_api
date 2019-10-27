class LocationsController < ApplicationController
  def cities
    cities = City.where(province_id: params[:id])
    render json: cities
  end

  def districts
    districts = District.where(city_id: params[:id])
    render json: districts
  end

  def urban_villages
    urban_villages = UrbanVillage.where(district_id: params[:id])
    render json: urban_villages
  end
end
