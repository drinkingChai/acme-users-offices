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

    // offices.push({ name, lat, lng, users: [] })
    offices.push(genOffice(name, lat, lng))
    $input.val("");

    drawOffices();
    drawUsers();
  });

  $(config.id).append($form);
}
