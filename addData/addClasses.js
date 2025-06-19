const docClient = require("../dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const classes = [
  {
    ClassId: "CLS001",
    ClassName: "Linear Algebra",
    ClassCode: "LINE-483",
    TeacherId: "TCH005",
    Semester: "Fall 2024",
    MaxStudents: 35,
  },
  {
    ClassId: "CLS002",
    ClassName: "World History",
    ClassCode: "WORL-156",
    TeacherId: "TCH016",
    Semester: "Spring 2025",
    MaxStudents: 40,
  },
  {
    ClassId: "CLS003",
    ClassName: "World History",
    ClassCode: "WORL-463",
    TeacherId: "TCH031",
    Semester: "Fall 2024",
    MaxStudents: 35,
  },
  {
    ClassId: "CLS004",
    ClassName: "Advanced Calculus I",
    ClassCode: "ADVA-281",
    TeacherId: "TCH023",
    Semester: "Fall 2024",
    MaxStudents: 30,
  },
  {
    ClassId: "CLS005",
    ClassName: "Linear Algebra",
    ClassCode: "LINE-177",
    TeacherId: "TCH042",
    Semester: "Spring 2025",
    MaxStudents: 40,
  },
  {
    ClassId: "CLS006",
    ClassName: "Organic Chemistry",
    ClassCode: "ORGA-330",
    TeacherId: "TCH002",
    Semester: "Fall 2024",
    MaxStudents: 25,
  },
  {
    ClassId: "CLS007",
    ClassName: "Organic Chemistry",
    ClassCode: "ORGA-486",
    TeacherId: "TCH041",
    Semester: "Fall 2024",
    MaxStudents: 30,
  },
  {
    ClassId: "CLS008",
    ClassName: "British Literature",
    ClassCode: "BRIT-222",
    TeacherId: "TCH012",
    Semester: "Fall 2024",
    MaxStudents: 30,
  },
  {
    ClassId: "CLS009",
    ClassName: "Modern Physics",
    ClassCode: "MODE-199",
    TeacherId: "TCH013",
    Semester: "Fall 2024",
    MaxStudents: 30,
  },
  {
    ClassId: "CLS010",
    ClassName: "World History",
    ClassCode: "WORL-479",
    TeacherId: "TCH009",
    Semester: "Spring 2025",
    MaxStudents: 40,
  },
];

async function addClasses() {
  for (const cl of classes) {
    const input = {
      TableName: "Classes",
      Item: cl,
    };

    try {
      const command = new PutCommand(input);
      await docClient.send(command);
      console.log(` Added ${cl.ClassName}`);
    } catch (err) {
      console.error(`Error adding ${cl.ClassName}:`, err);
    }
  }
}

addClasses();
