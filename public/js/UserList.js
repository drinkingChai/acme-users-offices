const drawUsers = (config)=> {
  // draw all users
  // on add/remove user, draw all users
  // on adding/removing options, draw all users
  let $userlist = $(`
    <ul>
      ${ config.users.reduce((lis, user)=> {
          return lis += `
            <li data-id="${user.id}" data-cur-office-id=${user.officeId}>
              ${ user.name }
              <select>
                ${ config.offices.reduce((opts, off)=> {
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

  $userlist.on('click', 'button', function(e) {
    let id = $(this).parent().data().id;

    $.ajax({
      url: `/users/${id}`,
      method: 'DELETE',
      success: function() {
        // config.users = config.users.filter(user=> user.id != id);
        // config.offices.forEach(office=> {
        //   office.users = office.users.filter(u=> u.id != id);
        // })

        let usr = config.users.find(u=> u.id == id);
        config.users.splice(config.users.indexOf(usr), 1);
        config.offices.forEach(office=> {
          office.users = office.users.filter(u=> u.id != id);
        })

        // drawUsers(_users, _offices);
        // drawOffices(_users, _offices);
        // drawAll(_users, _offices);
        drawUsers({ users: config.users, offices: config.offices });
        drawOffices({ users: config.users, offices: config.offices });
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
        let user = config.users.find(u=> u.id == id),
        prevOffice = config.offices.find(o=> o.id == prevOfficeId),
        newOffice = config.offices.find(o=> o.id == officeId);

        // TODO: remove from prev office
        // TODO: add to newOffice
        // TODO: render offices only
        if (prevOffice) prevOffice.users = prevOffice.users.filter(u=> u.id != user.id);
        if(newOffice) newOffice.users.push(user);
        user.officeId = newOffice ? newOffice.id : null;
        $user.parent().data().curOfficeId = user.officeId;

        // drawOffices(_users, _offices);
        // drawAll(_users, _offices);
        drawOffices({ users: config.users, offices: config.offices });
      }
    })

  })

  $('#user-list').empty();
  $('#user-list').append($userlist);
}
