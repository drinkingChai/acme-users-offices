$(function() {

  $.get('/users')
    .then(obj=> {
      genUserPanel({
        users: obj.users,
        offices: obj.offices,
        parent: '#users'
      })
    })

  $.get('/offices')
    .then(offices=> {
      genOfficePanel({
        offices,
        parent: '#offices'
      })
    })


  const genOffice = (config)=> {
    let template = `
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

    let $html = $(template);

    $html.on('click', 'button', function(e) {
      $html.remove();
    })

    $(config.parent).append($html);
  }

  const genOfficePanel = (config)=> {
    let template = `
      <div>
      New location: <input type="text"/><button class="add-office">Add</button>
      </div>
    `;

    let $html = $(template),
      $add = $html.find('.add-office');

    $add.on('click', function() {
      // TODO: ajax post, render new html
      // fake data
      genOffice({ office: { name: $html.find('input').val(), users: [] }, parent: $html })
    })

    config.offices.forEach(office=> {
      genOffice({ office, parent: $html })
    })

    $(config.parent).append($html);
  }

  const genUserPanel = (config)=> {
    // Office: ${user.office.name}
    let template = `
      <div>
      New user: <input type="text"/><button class="add-user">Add</button>
        ${ config.users.reduce((aggr, user)=> {
            return aggr += `
              <li>
                ${user.name} <br/>
                <select>
                  <option>---</option>
                  ${ config.offices.reduce((aggr, office)=> {
                      if (user.office && office.id == user.office.id) return aggr += `
                        <option selected="selected">${office.name}</option>
                      `;
                      return aggr += `
                        <option>${office.name}</option>
                      `;
                    }, '')}
                </select>
                <br/>
                <button>Delete</button>
              </li>
              <br/>
            `;
          }, '') }
      </div>
    `;

    let $html = $(template),
      $add = $html.find('.add-user');

    $add.on('click', function() {
      // TODO: ajax
    })

    $(config.parent).append($html);
  }

})
