let count = 10; //fake

const genOffice = (config)=> {
  let office = `
    <li data-id=${config.office.id}>
      ${config.office.name}
      ${config.office.lat}
      ${config.office.lang}
      <br/>
      Users: <span class="user-count">${config.office.users.length}</span>
      <br/>
      <button>Delete</button>
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
      New office: <input type="text"/>
      <button>Add</button>
    </div>
  `;

  let $officeform = $(officeform);

  $officeform.on('click', 'button', function() {
    $.post('/offices', { name: $officeform.find('input').val() })
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
  })

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
