class FormController < ApplicationController
  def kyc
    @identity = params.dig(:id) ? Identity.where(nik: params[:id]).last : Identity.new
    @passport = params.dig(:identity_id) ? Identity.find_by(nik: params[:identity_id]).passports.build : @identity.passports.build
  end

  def post_identity
    @referrer = params[:referrer]
    @identity = Identity.new(identity_params)
    if @identity.save
      @passport = @identity.passports.build
    else
      render :kyc
    end
  end

  def post_passport
    @passport = Passport.new(passport_params)
    callback_id = params.dig(:passport_only) ? @passport.id : @passport.identity_id
    if @passport.save
      @success = true
      redirect_to params[:referrer] + "?identity_callback=#{callback_id}"
    else
      @success = false
    end
  end

  private

  def identity_params
    params.require(:identity).permit(
      :nik, :name, :birth_date, :birth_place, :gender, :address, :province_id,
      :city_id, :district_id, :urban_village_id, :rt, :rw, :religion, :martial_status,
      :occupation, :nationality, :image
    )
  end

  def passport_params
    params.require(:passport).permit(
      :full_name, :birth_place, :mother_name, :father_name, :number, :expired_date,
      :released_date, :birth_date, :identity_id, :image
    )
  end
end
