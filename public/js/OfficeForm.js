const drawOfficeForm = (config)=> {
  let $form = $(`
    <div>
      New office! <input type="text"/>
    </div>
  `);

  let $input = $form.find('input:first');

  // gmaps
  let autocomplete = new google.maps.places.Autocomplete($input[0]);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    let place = autocomplete.getPlace(),
      name = place.formatted_address,
      lat = place.geometry.location.lat(),
      lng = place.geometry.location.lng();

    $.post('/offices', { name, lat, lng })
      .then(office=> {
        config.offices.push({ name, id: office.id, lat, lng, users: [] })
        $input.val("");

        drawOffices({ users: config.users, offices: config.offices });
        drawUsers({ users: config.users, offices: config.offices });
      })
  });

  $(config.id).empty();
  $(config.id).append($form);
}
