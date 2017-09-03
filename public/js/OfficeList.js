const drawOffices = ()=> {
  let $offices = $(`
    <ul>
      ${ offices.reduce((lis, office)=> {
          return lis += `
            <li data-id="${office.id}">
              <p>${office.name}</p>
              <p>${office.lat}</p>
              <p>${office.lng}</p>
              <p>Users: ${office.users.length}</p>
              <button class="btn">Delete</button>
            </li>
          `;
        }, '')}
    </ul>
  `);

  // on delete, update users
  $offices.on('click', 'button', function() {
    let id = $(this).parent().data().id;
    offices = offices.filter(office=> office.id != id);

    drawOffices();
    drawUsers();
  })

  $('#office-list').empty();
  $('#office-list').append($offices);
}
