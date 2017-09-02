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
      lang: 70,
      users: [ users[0] ]
    },
    {
      name: 'Village',
      id: 2,
      lat: 80,
      lang: -90,
      users: [ users[1], users[2] ]
    }
  ]

  const updateOffice = (officeId, userCount)=> {
    let $office = $officelist.find(`[data-id=${officeId}]`);
    $office.find('.user-count').html(userCount);
  }

  const updateUsers = (office)=> {
    let option = `
      <option data-office-id="${office.id}">${office.name}</option>
    `;

    $userlist.children().each(function() {
      $(this).find('select').append($(option))
    })
  }

  const deleteOption = (officeId)=> {
    $userlist.children().find(`[data-office-id=${officeId}]`).remove();
    // hmm offices isn't changing
  }

  let $userlist = genUserList({
    parent: '#user-list',
    users,
    offices,
    updateOffice
  }),
  $userform = genUserForm({
    parent: '#user-form',
    userlist: $userlist,
    users,
    offices,
    updateOffice
  }),
  $officelist = genOfficeList({
    parent: '#office-list',
    offices,
    updateUsers,
    deleteOption
  }),
  $officeform = genOfficeForm({
    parent: '#office-form',
    officelist: $officelist,
    offices,
    updateUsers,
    deleteOption
  })


})
