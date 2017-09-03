const drawUserForm = (config)=> {
  let $form = $(`
    <div>
      <h3>Name:</h3> <input type="text"/>
      <button class="btn">Add</button>
    </div>
  `);

  let $input = $form.find('input');

  $form.on('click', 'button', function() {
    if (!$input.val().trim().length) return;

    $.post('/users', { name: $input.val() })
      .then(user=> {
        config.users.push(user);
        $input.val("");

        drawUsers({ users: config.users, offices: config.offices });
      })
  })

  $(config.id).empty();
  $(config.id).append($form);
}
