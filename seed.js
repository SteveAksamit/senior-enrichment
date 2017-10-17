const Models = require('./db/models');
const Campuses = Models.Campuses;
const Students = Models.Students;
const db = require('./db/');

const campuses = [
    { name: 'Indiana University', location: 'Bloomington'},
    { name: 'University of Wisconsin', location: 'Madison'},
    { name: 'University of Chicago', location: 'Chicago'},
    { name: 'University of Michigan', location: 'Ann Arbor'}
];

const students = [
    { campusId: 1, name: 'Steve Aksamit', email: 'steve@gmail.com'},
    { campusId: 1, name: 'Eric Peterson', email: 'eric@gmail.com'},
    { campusId: 1, name: 'Wendy Guilfoyle', email: 'wendy@gmail.com'},
    { campusId: 1, name: 'Sanjiv Peters', email: 'sanjeev@yahoo.com'},
    { campusId: 1, name: 'Sam Tomleson', email: 'sam@gmail.com'},
    { campusId: 2, name: 'Katie Macabe', email: 'katie@gmail.com'},
    { campusId: 2, name: 'Tom Jordan', email: 'tom@gmail.com'},
    { campusId: 2, name: 'Kevin Smith', email: 'kevin@yahoo.com'},
    { campusId: 2, name: 'Janice Piermont', email: 'janice@gmail.com'},
    { campusId: 2, name: 'Jenny Foreman', email: 'jenny@gmail.com'},
    { campusId: 2, name: 'Chris Evans', email: 'chris@gmail.com'},
    { campusId: 3, name: 'Nancy Salb', email: 'nancy@yahoo.com'},
    { campusId: 3, name: 'Dave Nelson', email: 'dave@msn.com'},
    { campusId: 3, name: 'Bruce Jones', email: 'bruce@gmail.com'},
    { campusId: 3, name: 'Marty Brady ', email: 'marty@gmail.com'},
    { campusId: 3, name: 'Amanda Anderson', email: 'amanda@yahoo.com'},
    { campusId: 3, name: 'Greg Tolan', email: 'greg@gmail.com'},
    { campusId: 3, name: 'Dennis Payonk', email: 'dennis@gmail.com'},
    { campusId: 4, name: 'Anne Colley', email: 'anne@gmail.com'},
    { campusId: 4, name: 'Kelly Michaels', email: 'kelly@yahoo.com'},
    { campusId: 4, name: 'Ben Timmers', email: 'ben@msn.com'},
    { campusId: 4, name: 'Mike Roberts', email: 'mike@gmail.com'},
    { campusId: 4, name: 'Sara Wade', email: 'sara@gmail.com'},
    { campusId: 4, name: 'Jake Byerly', email: 'jake@yahoo.com'}
];

const seedData = () =>
Promise.all(campuses.map(campus =>
  Campuses.create(campus))
)
.then(() =>
Promise.all(students.map(student =>
  Students.create(student))
));

const runSeed = () => {
console.log('Starting DB Seed...');
db.sync({ force: true })
  .then(() => {
    console.log('DB Seeding Complete!!!');
    return seedData();
  })
  .catch(err => {
    console.log('Seed error', err);
  })
  .then(() => {
    db.close();
    return null;
  });
};

runSeed();
