const OfficeList = (config)=> {
  let $officelist = $(`
    <ul>
      ${ config.upstreamData.offices.reduce((lis, office)=> {
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

  $officelist.on('click', 'button', function() {
    let id = $(this).parent().data().id;

    $.ajax({
      url: `/offices/${id}`,
      method: 'DELETE',
      success: function() {
        let off = config.upstreamData.offices.find(o=> o.id == id);
        config.upstreamData.offices.splice(config.upstreamData.offices.indexOf(off), 1);

        config.targets.forEach(t=> config.downstreamObjs[t].update(config.upstreamData));
      }
    })
  })

  $officelist.update = function(upstreamData) {
    config.upstreamData = upstreamData;
    $(config.id).empty();

    OfficeList(config);
  }

  $(config.id).append($officelist);
  config.downstreamObjs.officelist = $officelist;
}
