const UserList = (config)=> {
  let $userlist = $(`
    <ul>
      ${ config.upstreamData.users.reduce((lis, user)=> {
          return lis += `
            <li data-id="${user.id}" data-cur-office-id=${user.officeId}>
              <h3 class="text-bold">${ user.name }</h3>
              <select>
                ${ config.upstreamData.offices.reduce((opts, off)=> {
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

  $userlist.update = function(upstreamData) {
    config.upstreamData = upstreamData;
    $(config.id).empty();

    UserList(config);
  }

  $userlist.on('click', 'button', function(e) {
    let id = $(this).parent().data().id;

    $.ajax({
      url: `/users/${id}`,
      method: 'DELETE',
      success: function() {
        // config.upstreamData.users = config.upstreamData.users.filter(user=> user.id != id);
        // config.upstreamData.offices.forEach(office=> {
        //   office.users = office.users.filter(u=> u.id != id);
        // })

        let usr = config.upstreamData.users.find(u=> u.id == id);
        config.upstreamData.users.splice(config.upstreamData.users.indexOf(usr), 1);
        config.upstreamData.offices.forEach(office=> {
          office.users = office.users.filter(u=> u.id != id);
        })

        config.targets.forEach(t=> config.downstreamObjs[t].update(config.upstreamData));
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
        let user = config.upstreamData.users.find(u=> u.id == id),
        prevOffice = config.upstreamData.offices.find(o=> o.id == prevOfficeId),
        newOffice = config.upstreamData.offices.find(o=> o.id == officeId);

        // TODO: remove from prev office
        // TODO: add to newOffice
        // TODO: render offices only
        if (prevOffice) prevOffice.users = prevOffice.users.filter(u=> u.id != user.id);
        if(newOffice) newOffice.users.push(user);
        user.officeId = newOffice ? newOffice.id : null;
        $user.parent().data().curOfficeId = user.officeId;

        config.targets.forEach(t=> config.downstreamObjs[t].update(config.upstreamData));
      }
    })

  })

  $(config.id).append($userlist)
  config.downstreamObjs[config.dsObj] = $userlist;
}
