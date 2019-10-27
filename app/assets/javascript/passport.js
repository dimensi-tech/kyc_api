$(document).ready(function() {
  // Form input mask
  $('input[name="passport[birth_date]"], input[name="passport[released_date]"], input[name="passport[expired_date]"]').mask('00/00/0000')

  // Form validation rules
  $("#new_passport").validate({
    rules: {
      'passport[nik]': {
        required: true
      },
      'passport[full_name]': {
        required: true
      },
      'passport[birth_place]': {
        required: true
      },
      'passport[mother_name]': {
        required: true
      },
      'passport[father_name]': {
        required: true
      },
      'passport[number]': {
        required: true
      },
      'passport[expired_date]': {
        required: true
      },
      'passport[released_date]': {
        required: true
      }
    }
  })
})
