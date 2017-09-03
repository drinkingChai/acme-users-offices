const UserForm = (config)=> {
  let $userform = $(`
    <div>
      <h3>Name:</h3> <input type="text"/>
      <button class="btn">Add</button>
    </div>
  `);

  let $input = $userform.find('input');

  $userform.on('click', 'button', function() {
    $.post('/users', { name: $input.val() })
      .then(user=> {
        $input.val("");
        config.upstreamData.users.push(user);
        config.targets.forEach(t=> config.downstreamObjs[t].update(config.upstreamData));
      })
  })

  $(config.id).append($userform)
}
