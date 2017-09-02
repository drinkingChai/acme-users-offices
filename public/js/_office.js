let count = 10; //fake

const genOffice = (config)=> {
  let office = `
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

  let $office = $(office);

  return $office;
}

const genOfficeForm = (config)=> {
  let officeform = `
    <div>
      New office: <input type="text"/>
      <button>Add</button>
    </div>
  `;

  let $officeform = $(officeform);

  $officeform.on('click', 'button', function() {
    // TODO: do ajax stuff
    let office = { name: $officeform.find('input').val(), id: count++, users: [] } // fake
    let $office = genOffice({
      office
    })
    config.offices.push(office);
    config.officelist.append($office);
  })

  $(config.parent).append($officeform);
}

const genOfficeList = (config)=> {
  let offices = `
    <ul></ul>
  `;

  let $offices = $(offices);

  config.offices.forEach(office=> {
    let $office = genOffice({
      office
    })
    $offices.append($office);
  })

  $(config.parent).append($offices);
  return $offices;
}
