const drawUserForm = (users, offices, config, drawAll)=> {
  let $form = $(`
    <div>
      Name: <input type="text"/>
      <button class="btn">Add</button>
    </div>
  `);

  let $input = $form.find('input');

  // caching..
  let _offices = offices,
    _users = users;

  $form.on('click', 'button', function() {
    if (!$input.val().trim().length) return;

    $.post('/users', { name: $input.val() })
      .then(user=> {
        _users.push(user);

        // have to update everything since the data is cached :(
        // $(config.id).empty();
        // drawUsers(_users, _offices);
        // drawUserForm(_users, _offices, config);
        // drawOfficeForm(_users, _offices, { id: '#office-form' });
        drawAll(_users, _offices);
      })
  })

  $(config.id).empty();
  $(config.id).append($form);
}
