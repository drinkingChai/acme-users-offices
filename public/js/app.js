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

  const genOfficePanel = (config)=> {
    let template = `
      <div>
        ${ config.offices.reduce((aggr, office)=> {
            return aggr += `
              <li>
                ${office.name}
                ${office.lat}
                ${office.lang}
                <br/>
                Users: ${office.users.length}
              </li>
              <br/>
            `;
          }, '') }
      </div>
    `;

    let $html = $(template);

    $(config.parent).append($html);
  }

  const genUserPanel = (config)=> {
    // Office: ${user.office.name}
    let template = `
      <div>
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
              </li>
              <br/>
            `;
          }, '') }
      </div>
    `;

    let $html = $(template);

    $(config.parent).append($html);
  }

})
