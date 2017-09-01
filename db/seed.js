const User = require('./User');
const Office = require('./Office');

const seed = ()=> {
  return Promise.all([
    User.create({ name: 'Stuff Mc.Stuffy' }),
    User.create({ name: 'Josh Clarke' }),
    User.create({ name: 'Charles Bryant' }),
    Office.create({ name: 'Cool stuff corps', lat: 900, lang: -233 }),
    Office.create({ name: 'Stuff you should eat', lat: 45, lang: 52 })
  ])
}

module.exports = seed;
