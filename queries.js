const { GetCommand ,ScanCommand} = require("@aws-sdk/lib-dynamodb");
const docClient = require("./dynamoClient");
async function getStudentById(studentId) {
  const command = new GetCommand({
    TableName: "Students",
    Key: { StudentId: studentId },
  });

  try {
    const result = await docClient.send(command);
    console.log(result.Item);
  } catch (err) {
    console.error("Error fetching student:", err);
  }
}
async function getBookById(bookId) {
  const input = {
    TableName: "Books",
    Key: {
      BookId: bookId,
    },
  };

  try {
    const command = new GetCommand(input);
    const result = await docClient.send(command);
    console.log(result.Item);
  } catch (err) {
    console.error("Error fetching book:", err);
  }
}
async function getStudentsBornAfter(dateStr) {
  const command = new ScanCommand({
    TableName: "Students",
    FilterExpression: "DateOfBirth > :dob",
    ExpressionAttributeValues: {
      ":dob": dateStr,
    },
  });

  try {
    const result = await docClient.send(command);
    console.log(result.Items);
  } catch (err) {
    console.error("Error getting DOB filter:", err);
  }
}
async function getStudentsByClassId(classId) {
  const enrollments = await docClient.send(new ScanCommand({
    TableName: "StudentClassEnrollments",
    FilterExpression: "ClassId = :cid",
    ExpressionAttributeValues: { ":cid": classId },
  }));

  const studentPromises = enrollments.Items.map(enrollment =>
    docClient.send(new GetCommand({
      TableName: "Students",
      Key: { StudentId: enrollment.StudentId },
    }))
  );

  const students = await Promise.all(studentPromises);
  console.log(students.map(s => s.Item));
}
async function getSpring2025EnrolledStudents() {
  const springClasses = await docClient.send(new ScanCommand({
    TableName: "Classes",
    FilterExpression: "Semester = :sem",
    ExpressionAttributeValues: { ":sem": "Spring 2025" },
  }));

  const classIds = springClasses.Items.map(cls => cls.ClassId);

  const enrollments = await docClient.send(new ScanCommand({
    TableName: "StudentClassEnrollments",
    FilterExpression: "ClassId IN (" + classIds.map((_, i) => `:id${i}`).join(", ") + ")",
    ExpressionAttributeValues: classIds.reduce((acc, id, i) => {
      acc[`:id${i}`] = id;
      return acc;
    }, {}),
  }));

  const studentIds = [...new Set(enrollments.Items.map(e => e.StudentId))];
  const studentPromises = studentIds.map(id =>
    docClient.send(new GetCommand({ TableName: "Students", Key: { StudentId: id } }))
  );

  const students = await Promise.all(studentPromises);
  console.log(students.map(s => s.Item));
}
async function getBooksForStudent(studentId) {
  // Step 1: Get enrolled classes
  const enrollments = await docClient.send(new ScanCommand({
    TableName: "StudentClassEnrollments",
    FilterExpression: "StudentId = :sid",
    ExpressionAttributeValues: { ":sid": studentId },
  }));

  const classIds = enrollments.Items.map(e => e.ClassId);

  // Step 2: Get book assignments for these classes
  const bookAssignments = await docClient.send(new ScanCommand({
    TableName: "ClassBookAssignments",
    FilterExpression: "ClassId IN (" + classIds.map((_, i) => `:cls${i}`).join(", ") + ")",
    ExpressionAttributeValues: classIds.reduce((acc, id, i) => {
      acc[`:cls${i}`] = id;
      return acc;
    }, {}),
  }));

  // Step 3: Get full book details
  const bookIds = [...new Set(bookAssignments.Items.map(b => b.BookId))];
  const bookPromises = bookIds.map(bookId =>
    docClient.send(new GetCommand({ TableName: "Books", Key: { BookId: bookId } }))
  );

  const books = await Promise.all(bookPromises);
  console.log(books.map(b => b.Item));
}
async function countBookUsageAcrossClasses() {
  const result = await docClient.send(new ScanCommand({
    TableName: "ClassBookAssignments",
  }));

  const usageMap = {};

  result.Items.forEach(b => {
    usageMap[b.BookId] = (usageMap[b.BookId] || 0) + 1;
  });

  for (const [bookId, count] of Object.entries(usageMap)) {
    const book = await docClient.send(new GetCommand({ TableName: "Books", Key: { BookId: bookId } }));
    console.log(`${book.Item.Title} ID ${bookId} used in ${count} class(es)`);
  }
}

countBookUsageAcrossClasses();


//getBooksForStudent("STU003");


//getSpring2025EnrolledStudents();


//getStudentsByClassId("CLS005");




//getStudentById("STU038");
//getStudentsBornAfter("2005-01-01");
//getBookById("BK023");

