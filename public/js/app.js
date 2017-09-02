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
  }),
  $officelist = genOfficeList({
    parent: '#office-list',
    offices
  }),
  $officeform = genOfficeForm({
    parent: '#office-form',
    officelist: $officelist
  })
})
