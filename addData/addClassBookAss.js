const docClient = require("../dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const classBook = [
  {
    ClassId: "CLS008",
    BookId: "BK006",
    AssignedDate: "2024-08-23",
    IsRequired: true,
    ChaptersAssigned: "1-14",
  },
  {
    ClassId: "CLS008",
    BookId: "BK025",
    AssignedDate: "2024-10-05",
    IsRequired: false,
    ChaptersAssigned: "7-12",
  },
  {
    ClassId: "CLS009",
    BookId: "BK009",
    AssignedDate: "2024-08-25",
    IsRequired: true,
    ChaptersAssigned: "1-20",
  },
  {
    ClassId: "CLS009",
    BookId: "BK013",
    AssignedDate: "2024-08-25",
    IsRequired: false,
    ChaptersAssigned: "4-11",
  },
  {
    ClassId: "CLS009",
    BookId: "BK015",
    AssignedDate: "2024-09-30",
    IsRequired: true,
    ChaptersAssigned: "1-17",
  },
  {
    ClassId: "CLS010",
    BookId: "BK017",
    AssignedDate: "2025-01-10",
    IsRequired: true,
    ChaptersAssigned: "1-19",
  },
  {
    ClassId: "CLS010",
    BookId: "BK024",
    AssignedDate: "2025-01-10",
    IsRequired: true,
    ChaptersAssigned: "1-15",
  },
  {
    ClassId: "CLS001",
    BookId: "BK023",
    AssignedDate: "2024-10-10",
    IsRequired: false,
    ChaptersAssigned: "1-6",
  },
  {
    ClassId: "CLS003",
    BookId: "BK024",
    AssignedDate: "2024-09-10",
    IsRequired: false,
    ChaptersAssigned: "8-13",
  },
  {
    ClassId: "CLS005",
    BookId: "BK016",
    AssignedDate: "2025-02-15",
    IsRequired: true,
    ChaptersAssigned: "1-11",
  },
];

async function addClassBook() {
  for (const item of classBook) {
    const input = {
      TableName: "ClassBookAssignments",
      Item: item,
    };

    try {
      const command = new PutCommand(input);
      await docClient.send(command);
      console.log(` Added ${item.ClassId}`);
    } catch (err) {
      console.error(`Error adding ${item.classId}:`, err);
    }
  }
}

addClassBook();
