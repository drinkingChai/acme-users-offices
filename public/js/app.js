$(function() {

  let users;
  $.get('/users')
    .then(_users=> {
      users = _users;
      return $.get('/offices')
    })
    .then(offices=> {

      const drawAll = (_users, _offices)=> {
        drawUserForm(
          _users,
          _offices,
          {
            id: '#user-form'
          },
          drawAll
        )

        drawOfficeForm(
          _users,
          _offices,
          {
            id: '#office-form'
          },
          drawAll
        )

        drawUsers(_users, _offices, drawAll);
        drawOffices(_users, _offices, drawAll);
      }

      drawAll(users, offices);
    })
})
