$(function() {

  let users = [
    {
      name: 'John Smithy',
      id: 1,
      officeId: 1
    },
    {
      name: 'Pocahontas',
      id: 2,
      officeId: 2
    },
    {
      name: 'Willow',
      id: 3,
      officeId: 2
    }
  ],
  offices = [
    {
      name: 'SS India',
      id: 1,
      lat: 40,
      lang: 70
    },
    {
      name: 'Village',
      id: 2,
      lat: 80,
      lang: -90
    }
  ]





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

  const genOffice = (config)=> {

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

  const genOfficeForm = (config)=> {

  }

  const genUserList = (config)=> {
    let userlist = `
      <ul></ul>
    `;

    let $userlist = $(userlist);

    config.users.forEach(user=> {
      $user = genUser({
        user: user,
        offices: config.offices
      })

      $userlist.append($user);
    })

    $(config.parent).append($userlist);
    return $userlist;
  }

  const genOfficeList = (config)=> {

  }

  let $userlist = genUserList({
    parent: '#user-list',
    users,
    offices
  }),
  $userform = genUserForm({
    parent: '#user-form',
    userlist: $userlist,
    users,
    offices
  })
})
