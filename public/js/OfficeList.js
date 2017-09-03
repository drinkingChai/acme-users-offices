const drawOffices = (users, offices, drawAll)=> {
  let $offices = $(`
    <ul>
      ${ offices.reduce((lis, office)=> {
          return lis += `
            <li data-id="${office.id}">
              <p>${office.name}</p>
              <p>${office.lat}</p>
              <p>${office.lng}</p>
              <p>Users: ${office.users.length}</p>
              <button class="btn">Delete</button>
            </li>
          `;
        }, '')}
    </ul>
  `);

  // on delete, update users
  // caching...
  let _offices = offices,
    _users = users;

  $offices.on('click', 'button', function() {
    let id = $(this).parent().data().id;

    $.ajax({
      url: `/offices/${id}`,
      method: 'DELETE',
      success: function() {
        _offices = _offices.filter(office=> office.id != id);

        // drawOffices(_users, _offices);
        // drawUsers(_users, _offices);
        drawAll(_users, _offices);
      }
    })
  })

  $('#office-list').empty();
  $('#office-list').append($offices);
}
