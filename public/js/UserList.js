const drawUsers = (users, offices, drawAll)=> {
  // draw all users
  // on add/remove user, draw all users
  // on adding/removing options, draw all users
  let $userlist = $(`
    <ul>
      ${ users.reduce((lis, user)=> {
          return lis += `
            <li data-id="${user.id}" data-cur-office-id=${user.officeId}>
              ${ user.name }
              <select>
                ${ offices.reduce((opts, off)=> {
                    return opts += `
                      <option data-office-id="${off.id}" ${off.id === user.officeId ? "selected": ""}>${off.name}</option>
                    `;
                  }, '<option>---</option>')}
              </select>
              <button class="btn">Delete!</button>
            </li>
          `;
        }, '')}
    </ul>
  `);

  // caching..
  let _offices = offices,
    _users = users;

  $userlist.on('click', 'button', function(e) {
    let id = $(this).parent().data().id;

    $.ajax({
      url: `/users/${id}`,
      method: 'DELETE',
      success: function() {
        _users = _users.filter(user=> user.id != id);
        _offices.forEach(office=> {
          office.users = office.users.filter(u=> u.id != id);
        })

        // drawUsers(_users, _offices);
        // drawOffices(_users, _offices);
        drawAll(_users, _offices);
      }
    })
  })

  // on change, drawUsers
  $userlist.on('change', 'select', function() {
    let id = $(this).parent().data().id,
      prevOfficeId = $(this).parent().data().curOfficeId,
      officeId = $(this).find(':selected').data().officeId,
      $user = $(this);

    $.ajax({
      url: `/users/${id}`,
      method: 'PUT',
      data: { officeId: officeId ? officeId : 0 },
      success: function() {
        let user = _users.find(u=> u.id == id),
        prevOffice = _offices.find(o=> o.id == prevOfficeId),
        newOffice = _offices.find(o=> o.id == officeId);

        // TODO: remove from prev office
        // TODO: add to newOffice
        // TODO: render offices only
        if (prevOffice) prevOffice.users = prevOffice.users.filter(u=> u.id != user.id);
        if(newOffice) newOffice.users.push(user);
        user.officeId = newOffice ? newOffice.id : null;
        $user.parent().data().curOfficeId = user.officeId;

        // drawOffices(_users, _offices);
        drawAll(_users, _offices);
      }
    })

  })

  $('#user-list').empty();
  $('#user-list').append($userlist);
}
