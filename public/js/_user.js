const genUser = (config)=> {
  let user = `
    <li>
      ${config.user.name}
      <select>
        <option>---</option>
        ${ config.offices.reduce((aggr, office)=> {
            if (config.user.officeId && office.id == config.user.officeId) return aggr += `
              <option selected="selected">${office.name}</option>
            `;
            return aggr += `
              <option>${office.name}</option>
            `;
          }, '')}
      </select>
      <br/>
      <button>Delete</button>
    </li>
  `;

  let $user = $(user);
  $user.find('select').on('change', function() {
    // TODO: do ajax stuff
    console.log('did stuff');
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
    let user = { name: $input.val() }; //fake
    $newUser = genUser({
      user,
      offices: config.offices
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
      offices: config.offices
    })

    $userlist.append($user);
  })

  $(config.parent).append($userlist);
  return $userlist;
}
