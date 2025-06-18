const docClient = require("./dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const teachers = [
  {
    TeacherId: "TCH001",
    FullName: "Dr. Isabella James Davis",
    Email: "isabella.james.davis@school.edu",
    PhoneNumber: "+1-555-6539",
    Department: "Chemistry",
    HireDate: "2020-01-10",
  },
  {
    TeacherId: "TCH002",
    FullName: "Dr. Alex Michael Taylor",
    Email: "alex.michael.taylor@school.edu",
    PhoneNumber: "+1-555-9356",
    Department: "Computer Science",
    HireDate: "2017-12-22",
  },
  {
    TeacherId: "TCH003",
    FullName: "Dr. Jane Marie Wilson",
    Email: "jane.marie.wilson@school.edu",
    PhoneNumber: "+1-555-9418",
    Department: "Chemistry",
    HireDate: "2021-02-18",
  },
  {
    TeacherId: "TCH004",
    FullName: "Dr. Mason Elizabeth Davis",
    Email: "mason.elizabeth.davis@school.edu",
    PhoneNumber: "+1-555-1900",
    Department: "Biology",
    HireDate: "2021-06-07",
  },
  {
    TeacherId: "TCH005",
    FullName: "Dr. Liam Grace Smith",
    Email: "liam.grace.smith@school.edu",
    PhoneNumber: "+1-555-9293",
    Department: "English",
    HireDate: "2010-03-11",
  },
  {
    TeacherId: "TCH006",
    FullName: "Dr. Emma Michael Doe",
    Email: "emma.michael.doe@school.edu",
    PhoneNumber: "+1-555-6294",
    Department: "English",
    HireDate: "2019-04-06",
  },
  {
    TeacherId: "TCH007",
    FullName: "Dr. Alex Daniel Thomas",
    Email: "alex.daniel.thomas@school.edu",
    PhoneNumber: "+1-555-6164",
    Department: "Biology",
    HireDate: "2020-09-29",
  },
  {
    TeacherId: "TCH008",
    FullName: "Dr. Olivia Joseph Wilson",
    Email: "olivia.joseph.wilson@school.edu",
    PhoneNumber: "+1-555-2943",
    Department: "Computer Science",
    HireDate: "2016-06-14",
  },
  {
    TeacherId: "TCH009",
    FullName: "Dr. Sophia Rose Anderson",
    Email: "sophia.rose.anderson@school.edu",
    PhoneNumber: "+1-555-9444",
    Department: "Mathematics",
    HireDate: "2022-06-07",
  },
  {
    TeacherId: "TCH010",
    FullName: "Dr. Sophia Marie Thomas",
    Email: "sophia.marie.thomas@school.edu",
    PhoneNumber: "+1-555-5743",
    Department: "Computer Science",
    HireDate: "2018-09-06",
  },
];

async function addTeachers() {
  for (const teacher of teachers) {
    const input = {
      TableName: "Teachers",
      Item: teacher,
    };

    try {
      const command = new PutCommand(input);
      await docClient.send(command);
      console.log(` Added ${teacher.FullName}`);
    } catch (err) {
      console.error(`Error adding ${teacher.FullName}:`, err);
    }
  }
}

addTeachers();
