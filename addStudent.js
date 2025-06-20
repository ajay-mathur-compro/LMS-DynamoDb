const docClient = require("./dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const students = [
  {
    StudentId: "STU041",
    FullName: "James",
    Email: "james@student.school.edu",
    PhoneNumber: "+1-535-6756",
    DateOfBirth: "2008-06-26",
    Address: "499 Oak Street, Springfield, IL 62765",
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
