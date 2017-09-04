const UserForm = (config)=> {
  let $userform = $(`
    <div>
      <h3>Name:</h3> <input type="text"/>
      <button class="btn">Add</button>
    </div>
  `);

  let $input = $userform.find('input');

  $userform.on('click', 'button', function() {
    if (!$input.val().trim().length) return;
    $.post('/users', { name: $input.val() })
      .then(user=> {
        if (!user) return;
        $input.val("");
        config.upstreamData.users.push(user);
        config.targets.forEach(t=> config.downstreamObjs[t].update(config.upstreamData));
      })
  })

  $(config.id).append($userform)
}
