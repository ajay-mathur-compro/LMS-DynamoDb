const docClient = require('./dynamoClient');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');

const students = [
 {
    StudentId: 'STU021',
    FullName: 'Henry Ward',
    Email: 'henry.ward@student.school.edu',
    PhoneNumber: '+1-555-0021',
    DateOfBirth: '2004-08-05',
    Address: '21 Alder Circle, Springfield, IL 62721',
  },
  {
    StudentId: 'STU022',
    FullName: 'Evelyn Cox',
    Email: 'evelyn.cox@student.school.edu',
    PhoneNumber: '+1-555-0022',
    DateOfBirth: '2005-10-22',
    Address: '22 Sycamore Lane, Springfield, IL 62722',
  },
  {
    StudentId: 'STU023',
    FullName: 'Daniel Rivera',
    Email: 'daniel.rivera@student.school.edu',
    PhoneNumber: '+1-555-0023',
    DateOfBirth: '2006-06-17',
    Address: '23 Hawthorn Street, Springfield, IL 62723',
  },
  {
    StudentId: 'STU024',
    FullName: 'Ella Reed',
    Email: 'ella.reed@student.school.edu',
    PhoneNumber: '+1-555-0024',
    DateOfBirth: '2005-04-03',
    Address: '24 Olive Court, Springfield, IL 62724',
  },
  {
    StudentId: 'STU025',
    FullName: 'Matthew Perry',
    Email: 'matthew.perry@student.school.edu',
    PhoneNumber: '+1-555-0025',
    DateOfBirth: '2004-03-27',
    Address: '25 Willow Crescent, Springfield, IL 62725',
  },
  {
    StudentId: 'STU026',
    FullName: 'Grace Bennett',
    Email: 'grace.bennett@student.school.edu',
    PhoneNumber: '+1-555-0026',
    DateOfBirth: '2006-12-15',
    Address: '26 Dogwood Drive, Springfield, IL 62726',
  },
  {
    StudentId: 'STU027',
    FullName: 'Jack Hughes',
    Email: 'jack.hughes@student.school.edu',
    PhoneNumber: '+1-555-0027',
    DateOfBirth: '2005-05-11',
    Address: '27 Elmwood Lane, Springfield, IL 62727',
  },
  {
    StudentId: 'STU028',
    FullName: 'Scarlett Foster',
    Email: 'scarlett.foster@student.school.edu',
    PhoneNumber: '+1-555-0028',
    DateOfBirth: '2004-07-26',
    Address: '28 Palm Avenue, Springfield, IL 62728',
  },
  {
    StudentId: 'STU029',
    FullName: 'Jackson Bryant',
    Email: 'jackson.bryant@student.school.edu',
    PhoneNumber: '+1-555-0029',
    DateOfBirth: '2006-09-09',
    Address: '29 Sequoia Road, Springfield, IL 62729',
  },
  {
    StudentId: 'STU030',
    FullName: 'Chloe Brooks',
    Email: 'chloe.brooks@student.school.edu',
    PhoneNumber: '+1-555-0030',
    DateOfBirth: '2005-08-29',
    Address: '30 Larch Lane, Springfield, IL 62730',
  }
];

async function addStudents() {
  for (const student of students) {
    const input = {
      TableName: 'Students',
      Item: student,
    };

    try {
      const command = new PutCommand(input);
      await docClient.send(command);
      console.log(` Added ${student.FullName}`);
    } catch (err) {
      console.error(`Error adding ${student.FullName}:`, err);
    }
  }
}

addStudents();
