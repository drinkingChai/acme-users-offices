$(function() {

  $.get('/users')
    .then(users=> {

    })

  $.get('/offices')
    .then(offices=> {
      console.log(offices);
    })

})
