const conn = require('./conn');

const Office = conn.define('office', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false
  },
  lat: conn.Sequelize.FLOAT,
  lang: conn.Sequelize.FLOAT
})

module.exports = Office;
