const genOffice = (config)=> {
  let template = `
    <li>
      ${config.office.name}
      ${config.office.lat}
      ${config.office.lang}
      <br/>
      Users: ${config.office.users.length}
      <br/>
      <button>Delete</button>
    </li>
  `;

  let $html = $(template);

  $html.on('click', 'button', function(e) {
    $html.remove();
  })

  $(config.parent).append($html);
}
