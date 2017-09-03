$(function() {

  let users;
  $.get('/users')
    .then(_users=> {
      users = _users;
      return $.get('/offices')
    })
    .then(offices=> {

      var upstreamData = {
        users, offices
      }
      var downstreamObjs = {
        userlist: null,
        officelist: null
      };

      /*
        TODO: downstreamObjs generator
      */

      /*
        NOTE concept NOTE

      create an item, and give that item an "update" function
      create another item, and within it's targets: [] array, add other items
      on an event click, it will run "update" on all items in target targets.forEach(t=> t.update(newData));

      NOTE: the upstreamData "global" will be passed around between items to keep them up to date
            the downstreamObjs "global" will be passed around to update the items

      component layout:
        update(upstreamData)

        OfficeList (upstreamData)
          inner fns:
            Delete
          targets: [ OfficeList, UserList ]

        UserList (upstreamData)
          inner fns:
            Delete
            Update
          targets: [ OfficeList, UserList ]

        OfficeForm (upstreamData)
          inner fns:
            Add
          on inner fns, trigger:
          targets: [ OfficeList, UserList ]

        UserForm (upstreamData)
          inner fns:
            Add
          targets: [ UserList ]

      */


      UserList({
        id: '#user-list',
        upstreamData,
        downstreamObjs,
        targets: [ 'officelist', 'userlist' ]
      })

      OfficeList({
        id: '#office-list',
        upstreamData,
        downstreamObjs,
        targets: [ 'officelist', 'userlist' ]
      })

      UserForm({
        id: '#user-form',
        upstreamData,
        downstreamObjs,
        targets: [ 'userlist' ]
      })

      OfficeForm({
        id: '#office-form',
        upstreamData,
        downstreamObjs,
        targets: [ 'userlist', 'officelist' ]
      })

    })
})
