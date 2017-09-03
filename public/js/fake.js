let users = [
  {
    name: 'John Smithy',
    id: 1,
    officeId: 1
  },
  {
    name: 'Pocahontas',
    id: 2,
    officeId: 2
  },
  {
    name: 'Willow',
    id: 3,
    officeId: 2
  }
],
offices = [
  {
    name: 'SS India',
    id: 1,
    lat: 40,
    lng: 70,
    users: [users[0]]
  },
  {
    name: 'Village',
    id: 2,
    lat: 80,
    lng: -90,
    users: [users[1], users[2]]
  }
]

// fake data
let userCount = 10, officeCount = 20;
const genUser = (name)=> { return { name, id: userCount++, officeId: null }}
const genOffice = (name, lat, lng)=> { return { name, id: officeCount++, lat, lng, users: [] }}
//
