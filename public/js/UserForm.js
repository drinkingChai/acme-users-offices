const drawUserForm = (config)=> {
  let $form = $(`
    <div>
      Name: <input type="text"/>
      <button class="btn">Add</button>
    </div>
  `);

  let $input = $form.find('input');

  $form.on('click', 'button', function() {
    if (!$input.val().trim().length) return;
    let user = genUser($input.val()); // TODO: fake remove
    users.push(user);

    drawUsers();
  })

  $(config.id).append($form);
}
