$(document).ready(function() {
  // Location chain select
  var xhr
  var select_province, $select_province
  var select_city, $select_city
  var select_district, $select_district
  var select_urban_village, $select_urban_village
  var province_id = $('#select-province').attr('data-id')
  var city_id = $('#select-province').attr('data-city')
  var district_id = $('#select-province').attr('data-district')
  var urban_village_id = $('#select-province').attr('data-urban-village')


  $select_province = $('#select-province').selectize({
    onChange: function(value) {
      var currentProvince = !value ? province_id : value
      select_city.setValue('', false)
      select_city.disable()
      select_city.clearOptions()
      select_district.setValue('', false)
      select_district.disable()
      select_district.clearOptions()
      select_urban_village.setValue('', false)
      select_urban_village.disable()
      select_urban_village.clearOptions()
      select_city.load(function(callback) {
        xhr && xhr.abort()
        xhr = $.ajax({
          url: 'http://localhost:3000/locations/'+ currentProvince +'/cities.json',
          success: function(results) {
            select_city.enable()
            callback(results)
            select_city.setValue(city_id, true)
            $('#select-city')[0].selectize.trigger('change')
          },
          error: function() {
            callback()
          }
        })
      });
    }
  });

  $select_city = $('#select-city').selectize({
    valueField: 'id',
    labelField: 'name',
    searchField: ['name'],
    onChange: function(value) {
      var currentCity = !value ? city_id : value
      select_district.setValue('', false)
      select_district.disable()
      select_district.clearOptions()
      select_urban_village.setValue('', false)
      select_urban_village.disable()
      select_urban_village.clearOptions()
      select_district.load(function(callback) {
        xhr && xhr.abort()
        xhr = $.ajax({
          url: 'http://localhost:3000/locations/'+ currentCity +'/districts.json',
          success: function(results) {
            select_district.enable()
            callback(results)
            select_district.setValue(district_id, true)
            $('#select-district')[0].selectize.trigger('change')
          },
          error: function() {
            callback()
          }
        })
      });
    }
  });

  $select_district = $('#select-district').selectize({
    valueField: 'id',
    labelField: 'name',
    searchField: ['name'],
    onChange: function(value) {
      var currentDistrict = !value ? district_id : value
      select_urban_village.setValue('', false)
      select_urban_village.disable()
      select_urban_village.clearOptions()
      select_urban_village.load(function(callback) {
        xhr && xhr.abort()
        xhr = $.ajax({
          url: 'http://localhost:3000/locations/'+ currentDistrict +'/urban_villages.json',
          success: function(results) {
            select_urban_village.enable()
            callback(results)
            select_urban_village.setValue(urban_village_id, true)
          },
          error: function() {
            callback()
          }
        })
      });
    }
  })

  $select_urban_village = $('#select-urban-village').selectize({
    valueField: 'id',
    labelField: 'name',
    searchField: ['name']
  })

  select_province = $select_province[0].selectize
  select_city  = $select_city[0].selectize
  select_district = $select_district[0].selectize
  select_urban_village = $select_urban_village[0].selectize

  select_city.disable()
  select_district.disable()
  select_urban_village.disable()

  $('#select-province')[0].selectize.trigger('change')

  // Form input mask
  $('input[name="identity[birth_date]"]').mask('00/00/0000')
  $('input[name="identity[rw]"], input[name="identity[rt]"]').mask('000')

  // Form validation
  $("#new_identity").validate({
    rules: {
      'identity[nik]': {
        required: true
      },
      'identity[name]': {
        required: true
      },
      'identity[birth_place]': {
        required: true
      },
      'identity[birth_date]': {
        required: true
      },
      'identity[address]': {
        required: true
      },
      'identity[province_id]': {
        required: true
      },
      'identity[city_id]': {
        required: true
      },
      'identity[district_id]': {
        required: true
      },
      'identity[urban_village_id]': {
        required: true
      },
      'identity[rt]': {
        required: true
      },
      'identity[rw]': {
        required: true
      },
      'identity[religion]': {
        required: true
      },
      'identity[martial_status]': {
        required: true
      },
      'identity[occupation]': {
        required: true
      },
      'identity[nationality]': {
        required: true
      }
    }
  })
})
