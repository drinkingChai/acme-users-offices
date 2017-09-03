$(function() {

  let users;
  $.get('/users')
    .then(_users=> {
      users = _users;
      return $.get('/offices')
    })
    .then(offices=> {
      drawUserForm({
        id: '#user-form',
        users,
        offices
      })

      drawOfficeForm({
        id: '#office-form',
        users,
        offices
      })

      drawUsers({
        users,
        offices
      });
      drawOffices({
        users,
        offices
      });
    })
})
