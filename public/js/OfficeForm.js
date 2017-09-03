const drawOfficeForm = (users, offices, config, drawAll)=> {
  let $form = $(`
    <div>
      New office! <input type="text"/>
    </div>
  `);

  let $input = $form.find('input:first');

  // caching..
  let _offices = offices,
    _users = users;

  // gmaps
  let autocomplete = new google.maps.places.Autocomplete($input[0]);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    let place = autocomplete.getPlace(),
      name = place.formatted_address,
      lat = place.geometry.location.lat(),
      lng = place.geometry.location.lng();

    $.post('/offices', { name, lat, lng })
      .then(office=> {
        _offices.push({ name, id: office.id, lat, lng, users: [] })

        // $(config.id).empty();
        // drawOffices(_users, _offices);
        // drawUsers(_users, _offices);
        // drawOfficeForm(_users, _offices, config);
        drawAll(_users, _offices);
      })
  });

  $(config.id).empty();
  $(config.id).append($form);
}
