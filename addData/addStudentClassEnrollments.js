const docClient = require("../dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const studentsEnrolled = [
  {
    StudentId: "STU001",
    ClassId: "CLS003",
    EnrollmentDate: "2024-08-20",
    Status: "Active",
    CurrentGrade: "A",
    AttendancePercentage: 95.8,
  },
  {
    StudentId: "STU002",
    ClassId: "CLS004",
    EnrollmentDate: "2024-08-18",
    Status: "Active",
    CurrentGrade: "B-",
    AttendancePercentage: 79.6,
  },
  {
    StudentId: "STU003",
    ClassId: "CLS005",
    EnrollmentDate: "2025-01-12",
    Status: "Active",
    CurrentGrade: "A-",
    AttendancePercentage: 92.4,
  },
  {
    StudentId: "STU004",
    ClassId: "CLS006",
    EnrollmentDate: "2024-08-22",
    Status: "Active",
    CurrentGrade: "B+",
    AttendancePercentage: 88.3,
  },
  {
    StudentId: "STU005",
    ClassId: "CLS007",
    EnrollmentDate: "2024-08-25",
    Status: "Active",
    CurrentGrade: "A",
    AttendancePercentage: 96.9,
  },
  {
    StudentId: "STU006",
    ClassId: "CLS008",
    EnrollmentDate: "2024-08-28",
    Status: "Active",
    CurrentGrade: "B",
    AttendancePercentage: 84.1,
  },
  {
    StudentId: "STU007",
    ClassId: "CLS009",
    EnrollmentDate: "2024-08-30",
    Status: "Active",
    CurrentGrade: "A-",
    AttendancePercentage: 91.3,
  },
  {
    StudentId: "STU008",
    ClassId: "CLS010",
    EnrollmentDate: "2025-01-15",
    Status: "Active",
    CurrentGrade: "B-",
    AttendancePercentage: 76.7,
  },
  {
    StudentId: "STU009",
    ClassId: "CLS001",
    EnrollmentDate: "2024-08-15",
    Status: "Active",
    CurrentGrade: "A",
    AttendancePercentage: 97.2,
  },
  {
    StudentId: "STU010",
    ClassId: "CLS002",
    EnrollmentDate: "2025-01-10",
    Status: "Active",
    CurrentGrade: "B+",
    AttendancePercentage: 87.8,
  },
];

async function addStudents() {
  for (const student of studentsEnrolled) {
    const input = {
      TableName: "StudentClassEnrollments",
      Item: student,
    };

    try {
      const command = new PutCommand(input);
      await docClient.send(command);
      console.log(` Added ${student.EnrollmentDate}`);
    } catch (err) {
      console.error(`Error adding ${student.EnrollmentDate}:`, err);
    }
  }
}

addStudents();
