const drawUsers = ()=> {
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
                      <option data-office-id="${off.id}" ${off.id == user.officeId ? "selected": ""}>${off.name}</option>
                    `;
                  }, '<option>---</option>')}
              </select>
              <button class="btn">Delete!</button>
            </li>
          `;
        }, '')}
    </ul>
  `);

  $userlist.on('click', 'button', function(e) {
    let id = $(this).parent().data().id;
    users = users.filter(user=> user.id != id);

    drawUsers();
  })

  // on change, drawUsers
  $userlist.on('change', 'select', function() {
    let id = $(this).parent().data().id,
      prevOfficeId = $(this).parent().data().curOfficeId,
      officeId = $(this).find(':selected').data().officeId;

    let user = users.find(u=> u.id == id),
      prevOffice = offices.find(o=> o.id == prevOfficeId),
      newOffice = offices.find(o=> o.id == officeId);

    // TODO: remove from prev office
    // TODO: add to newOffice
    // TODO: render offices only
    if (prevOffice) prevOffice.users = prevOffice.users.filter(u=> u.id != user.id);
    if(newOffice) newOffice.users.push(user);
    user.officeId = newOffice ? newOffice.id : null;
    $(this).parent().data().curOfficeId = user.officeId;

    drawOffices();
  })

  $('#user-list').empty();
  $('#user-list').append($userlist);
}
