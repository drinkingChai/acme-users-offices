$(function() {

  let users;
  $.get('/users')
    .then(_users=> {
      users = _users;
      return $.get('/offices')
    })
    .then(offices=> {

      var dataBank = {
        users, offices
      }

      /*
        NOTE concept NOTE

      create an item, and give that item an "update" function
      create another item, and within it's targets: [] array, add other items
      on an event click, it will run "update" on all items in target targets.forEach(t=> t.update(newData));

      NOTE: the dataBank "global" will be passed around between items to keep them up to date

      component layout:
        update(dataBank)

        OfficeList (dataBank)
        UserList (dataBank)
        OfficeForm (dataBank)
          targets: [ OfficeList, UserList ]
        UserForm (dataBank)
          targets: [ UserList ]

      */


    })
})
