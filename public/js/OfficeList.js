const drawOffices = (config)=> {
  let $offices = $(`
    <ul>
      ${ config.offices.reduce((lis, office)=> {
          return lis += `
            <li data-id="${office.id}">
              <p class="text-bold">${office.name}</p>
              <div class="text-italic">
                <p>Lat: ${office.lat}</p>
                <p>Lng: ${office.lng}</p>
              </div>
              <p class="text-bold">Users: ${office.users.length}</p>
              <button class="btn">Delete</button>
            </li>
          `;
        }, '')}
    </ul>
  `);

  $offices.on('click', 'button', function() {
    let id = $(this).parent().data().id;

    $.ajax({
      url: `/offices/${id}`,
      method: 'DELETE',
      success: function() {
        // config.offices = config.offices.filter(office=> office.id != id);
        let off = config.offices.find(o=> o.id == id);
        config.offices.splice(config.offices.indexOf(off), 1);

        drawOffices({ users: config.users, offices: config.offices });
        drawUsers({ users: config.users, offices: config.offices });
      }
    })
  })

  $('#office-list').empty();
  $('#office-list').append($offices);
}
