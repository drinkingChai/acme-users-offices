const OfficeForm = (config)=> {
  let $form = $(`
    <div>
      <h3>New office!</h3> <input type="text"/>
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
        config.upstreamData.offices.push({ name, id: office.id, lat, lng, users: [] })
        $input.val("");

        config.targets.forEach(t=> config.downstreamObjs[t].update(config.upstreamData));
      })
  });

  $(config.id).append($form);
}
