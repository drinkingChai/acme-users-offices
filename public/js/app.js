$(function() {

  let users;

  $.get('/users')
    .then(_users=> {
      users = _users;
      return $.get('/offices');
    })
    .then(offices=> {
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

})
