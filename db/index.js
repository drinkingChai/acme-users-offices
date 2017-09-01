const conn = require('./conn');
const User = require('./User');
const Office = require('./Office');

const sync = ()=> {
  return conn.sync({ force: true })
}

module.exports = {
  sync,
  models: {
    User,
    Office
  }
}
