const conn = require('./conn');
const seed = require('./seed');
const User = require('./User');
const Office = require('./Office');

User.belongsTo(Office)
Office.hasMany(User)

Office.addUser = (officeId, userId)=> {
  let office;
  return Office.findOne({ where: { id: officeId }})
    .then(_office=> {
      office = _office;
      return User.findOne({ where: { id: userId }})
    })
    .then(user=> {
      office.addUsers(user);
    })
}

Office.removeUser = (officeId, userId)=> {
  return Office.findOne({
    where: { id: officeId },
    include: [{
      model: User,
      where: { id: userId }
    }]
  })
  .then(office=> {
    return office.removeUsers(office.users);
  })
}

Office.findIncludeUser = ()=> {
  return Office.findAll({
    include: [ User ]
  })
}

User.findIncludeOffice = ()=> {
  let users;
  return User.findAll({
    include: [ Office ]
  })
  // .then(_users=> {
  //   users = _users;
  //   return Office.findAll()
  // })
  // .then(offices=> {
  //   return { users, offices }
  // })
}

const sync = ()=> {
  return conn.sync({ force: true })
}

module.exports = {
  sync,
  seed,
  models: {
    User,
    Office
  }
}
