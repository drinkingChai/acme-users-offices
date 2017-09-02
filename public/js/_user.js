let uCount = 0; // TODO: fake, remove

const genUser = (config)=> {
  let user = `
    <li data-id=${config.id}>
      ${config.user.name}
      <select>
        <option data-office-id=${null}>---</option>
        ${ config.offices.reduce((aggr, office)=> {
            return aggr += `
              <option data-office-id="${office.id}" ${office.id == config.user.officeId ? selected="selected" : ""}>${office.name}</option>
            `;
          }, '')}
      </select>
      <br/>
      <button>Delete</button>
    </li>
  `;

  let $user = $(user),
    $select = $user.find('select');

  $select.on('change', function(e) {
    // TODO: do ajax stuff
    let current = config.offices.find(office=> office.id == config.user.officeId)
    if (current) {
      current.users = current.users.filter(user=> user.id != config.user.id)
      config.updateOffice(current.id, current.users.length);
    };

    let newOffice = config.offices.find(office=> office.id == $select.find(':selected').data().officeId);
    if (newOffice) {
      newOffice.users.push(config.user)
      config.updateOffice(newOffice.id, newOffice.users.length);
    };

    config.user.officeId = newOffice ? newOffice.id : null;
  })

  $user.on('click', 'button', function() {
    // TODO: ajax stuff
    let current = config.offices.find(office=> office.id == config.user.officeId)
    if (current) {
      current.users = current.users.filter(user=> user.id != config.user.id)
      config.updateOffice(current.id, current.users.length);
    };
    $user.remove();
  })

  return $user;
}

const genUserForm = (config)=> {
  /* NOTE: users offices global
    pushes to userlist dom
    pushes to users
  */
  let form = `
    <div>
      New user:
      <input type="text"/>
      <button>Add!</button>
    </div>
  `;

  let $form = $(form),
    $input = $form.find('input');

  $form.on('click', 'button', function() {
    // TODO: do ajax stuff, then get user
    let user = { name: $input.val(), id: uCount++, officeId: null }; //fake
    $newUser = genUser({
      user,
      offices: config.offices,
      updateOffice: config.updateOffice
    })
    config.users.push(user)
    $(config.userlist).append($newUser);
  })

  $(config.parent).append($form);
}

const genUserList = (config)=> {
  let userlist = `
    <ul></ul>
  `;

  let $userlist = $(userlist);
  config.users.forEach(user=> {
    let $user = genUser({
      user: user,
      offices: config.offices,
      updateOffice: config.updateOffice
    })
    $userlist.append($user);
  })

  $(config.parent).append($userlist);
  return $userlist;
}
