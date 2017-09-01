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

Office.findUserCount = ()=> {
  return Office.findAll({
    include: [ User ]
  })
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
