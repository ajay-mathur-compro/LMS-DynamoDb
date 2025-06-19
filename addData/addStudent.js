const docClient = require("../dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const students = [
  {
    StudentId: "STU031",
    FullName: "Liam James Anderson",
    Email: "liam.james.anderson@student.school.edu",
    PhoneNumber: "+1-555-6756",
    DateOfBirth: "2007-06-26",
    Address: "498 Oak Street, Springfield, IL 62765",
  },
  {
    StudentId: "STU032",
    FullName: "Alex Joseph Taylor",
    Email: "alex.joseph.taylor@student.school.edu",
    PhoneNumber: "+1-555-9375",
    DateOfBirth: "2003-04-13",
    Address: "440 Oak Street, Springfield, IL 62732",
  },
  {
    StudentId: "STU033",
    FullName: "Sophia Daniel Taylor",
    Email: "sophia.daniel.taylor@student.school.edu",
    PhoneNumber: "+1-555-2040",
    DateOfBirth: "2003-03-09",
    Address: "611 Oak Street, Springfield, IL 62779",
  },
  {
    StudentId: "STU034",
    FullName: "Alex Marie Johnson",
    Email: "alex.marie.johnson@student.school.edu",
    PhoneNumber: "+1-555-8947",
    DateOfBirth: "2006-03-02",
    Address: "677 Oak Street, Springfield, IL 62723",
  },
  {
    StudentId: "STU035",
    FullName: "John Lee Doe",
    Email: "john.lee.doe@student.school.edu",
    PhoneNumber: "+1-555-6497",
    DateOfBirth: "2006-10-17",
    Address: "935 Oak Street, Springfield, IL 62719",
  },
  {
    StudentId: "STU036",
    FullName: "Isabella Lee Thomas",
    Email: "isabella.lee.thomas@student.school.edu",
    PhoneNumber: "+1-555-8476",
    DateOfBirth: "2006-05-26",
    Address: "230 Oak Street, Springfield, IL 62723",
  },
  {
    StudentId: "STU037",
    FullName: "Mason Daniel Miller",
    Email: "mason.daniel.miller@student.school.edu",
    PhoneNumber: "+1-555-5276",
    DateOfBirth: "2005-07-09",
    Address: "164 Oak Street, Springfield, IL 62779",
  },
  {
    StudentId: "STU038",
    FullName: "Chris Marie Thomas",
    Email: "chris.marie.thomas@student.school.edu",
    PhoneNumber: "+1-555-2280",
    DateOfBirth: "2006-04-24",
    Address: "861 Oak Street, Springfield, IL 62739",
  },
  {
    StudentId: "STU039",
    FullName: "Sophia Grace Brown",
    Email: "sophia.grace.brown@student.school.edu",
    PhoneNumber: "+1-555-2412",
    DateOfBirth: "2005-08-05",
    Address: "183 Oak Street, Springfield, IL 62716",
  },
  {
    StudentId: "STU040",
    FullName: "Mason Rose Thomas",
    Email: "mason.rose.thomas@student.school.edu",
    PhoneNumber: "+1-555-9803",
    DateOfBirth: "2003-06-18",
    Address: "685 Oak Street, Springfield, IL 62784",
  },
];

async function addStudents() {
  for (const student of students) {
    const input = {
      TableName: "Students",
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
