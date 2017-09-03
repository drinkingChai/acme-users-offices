const drawUserForm = (config)=> {
  let $form = $(`
    <div>
      Name: <input type="text"/>
      <button class="btn">Add</button>
    </div>
  `);

  let $input = $form.find('input');

  // caching..

  $form.on('click', 'button', function() {
    if (!$input.val().trim().length) return;

    $.post('/users', { name: $input.val() })
      .then(user=> {
        config.users.push(user);
        $input.val("");

        // have to update everything since the data is cached :(
        // $(config.id).empty();
        // drawUsers(_users, _offices);
        // drawUserForm(_users, _offices, config);
        // drawOfficeForm(_users, _offices, { id: '#office-form' });
        // drawAll(_users, _offices);
        drawUsers({ users: config.users, offices: config.offices });
      })
  })

  $(config.id).empty();
  $(config.id).append($form);
}
