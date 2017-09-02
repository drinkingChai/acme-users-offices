let count = 10; //fake

const genOffice = (config)=> {
  let office = `
    <li data-id=${config.office.id}>
      <p>${config.office.name}</p>
      <p>Lat: ${config.office.lat}</p>
      <p>Lang: ${config.office.lng}</p>
      <h4 class="user-count">Users: ${config.office.users.length}</h4>
      <button class="btn">Delete</button>
    </li>
  `;

  let $office = $(office);

  $office.on('click', 'button', function() {
    $.ajax({
      url: `offices/${config.office.id}`,
      method: 'DELETE',
      success: function() {
        let index = config.offices.indexOf(config.office)
        // config.offices = config.offices.filter(office=> office.id !== config.office.id);
        config.offices.splice(index, 1);
        config.deleteOption(config.office.id);
        $office.remove();
      }
    })
  })

  return $office;
}

const genOfficeForm = (config)=> {
  let officeform = `
    <div>
      <h3>New office</h3>
      <br/>
      <input type="text" placeholder="Stuff!"/>
    </div>
  `;

  let $officeform = $(officeform);

  // gmaps
  let autocomplete = new google.maps.places.Autocomplete(($officeform.find('input')[0]));
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    let place = autocomplete.getPlace(),
      name = place.formatted_address,
      lat = place.geometry.location.lat(),
      lng = place.geometry.location.lng();

    $.post('/offices', { name, lat, lng })
      .then(office=> {
        office.users = [];  // lying to user?
        let $office = genOffice({
          office,
          offices: config.offices,
          updateUsers: config.updateUsers,
          deleteOption: config.deleteOption
        })
        config.offices.push(office);
        config.officelist.append($office);
        config.updateUsers(office);
      })
  });
  //

  // $officeform.on('click', 'button', function() {
  //
  // })

  $(config.parent).append($officeform);
}

const genOfficeList = (config)=> {
  let officelist = `
    <ul></ul>
  `;

  let $officelist = $(officelist);

  config.offices.forEach(office=> {
    let $office = genOffice({
      office,
      offices: config.offices,
      updateUsers: config.updateUsers,
      deleteOption: config.deleteOption
    })
    $officelist.append($office);
  })

  $(config.parent).append($officelist);
  return $officelist;
}
