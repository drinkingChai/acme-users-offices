const User = require('./User');
const Office = require('./Office');

const seed = ()=> {
  return Promise.all([
    User.create({ name: 'Stuff Mc.Stuffy' }),
    User.create({ name: 'Josh Clarke' }),
    User.create({ name: 'Charles Bryant' }),
    User.create({ name: `Jeri Rowloand` }),
    Office.create({ name: 'Cool stuff corps', lat: 900, lang: -233 }),
    Office.create({ name: 'Stuff you should eat', lat: 45, lang: 52 })
  ])
  .then(([u1, u2, u3, , o1, o2])=> {
    return Promise.all([
      o1.addUsers([u1, u2]),
      o2.addUsers(u3)
    ])
  })
}

module.exports = seed;
