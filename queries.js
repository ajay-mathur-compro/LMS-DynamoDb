const { GetCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const docClient = require("./dynamoClient");

//
// Function: getStudentById
// Description: Fetch a student record by its primary key (StudentId) from the Students table.
//
async function getStudentById(studentId) {
  const command = new GetCommand({
    TableName: "Students",
    Key: { StudentId: studentId }, // Primary key lookup
  });

  try {
    const result = await docClient.send(command);
    console.log(result.Item); // Log the student record
  } catch (err) {
    console.error("Error fetching student:", err);
  }
}

//
// Function: getBookById
// Description: Fetch a book record by its primary key (BookId) from the Books table.
//
async function getBookById(bookId) {
  const input = {
    TableName: "Books",
    Key: { BookId: bookId }, // Primary key lookup
  };

  try {
    const command = new GetCommand(input);
    const result = await docClient.send(command);
    console.log(result.Item); // Log the book record
  } catch (err) {
    console.error("Error fetching book:", err);
  }
}

//
// Function: getStudentsBornAfter
// Description: Retrieve students born after a specific date using a scan with a filter expression.
//
async function getStudentsBornAfter(dateStr) {
  const command = new ScanCommand({
    TableName: "Students",
    FilterExpression: "DateOfBirth > :dob",
    ExpressionAttributeValues: {
      ":dob": dateStr, // e.g., "2005-01-01"
    },
  });

  try {
    const result = await docClient.send(command);
    console.log(result.Items); // Log all matched student records
  } catch (err) {
    console.error("Error getting DOB filter:", err);
  }
}

//
// Function: getStudentsByClassId
// Description: Fetch all student details enrolled in a specific class using StudentClassEnrollments.
//
async function getStudentsByClassId(classId) {
  // Step 1: Find all enrollments for the given class
  const enrollments = await docClient.send(
    new ScanCommand({
      TableName: "StudentClassEnrollments",
      FilterExpression: "ClassId = :cid",
      ExpressionAttributeValues: { ":cid": classId },
    })
  );

  // Step 2: Fetch full student details for each enrolled student
  const studentPromises = enrollments.Items.map((enrollment) =>
    docClient.send(
      new GetCommand({
        TableName: "Students",
        Key: { StudentId: enrollment.StudentId },
      })
    )
  );

  // Step 3: Await all fetches and log student data
  const students = await Promise.all(studentPromises);
  console.log(students.map((s) => s.Item));
}

//
// Function: getSpring2025EnrolledStudents
// Description: Get students enrolled in any class scheduled for Spring 2025 semester.
//
async function getSpring2025EnrolledStudents() {
  // Step 1: Get all classes offered in Spring 2025
  const springClasses = await docClient.send(
    new ScanCommand({
      TableName: "Classes",
      FilterExpression: "Semester = :sem",
      ExpressionAttributeValues: { ":sem": "Spring 2025" },
    })
  );

  const classIds = springClasses.Items.map((cls) => cls.ClassId);

  // Step 2: Get enrollments for all matched class IDs
  const enrollments = await docClient.send(
    new ScanCommand({
      TableName: "StudentClassEnrollments",
      FilterExpression:
        "ClassId IN (" + classIds.map((_, i) => `:id${i}`).join(", ") + ")",
      ExpressionAttributeValues: classIds.reduce((acc, id, i) => {
        acc[`:id${i}`] = id;
        return acc;
      }, {}),
    })
  );

  // Step 3: Remove duplicate student IDs
  const studentIds = [...new Set(enrollments.Items.map((e) => e.StudentId))];

  // Step 4: Fetch full student records
  const studentPromises = studentIds.map((id) =>
    docClient.send(
      new GetCommand({ TableName: "Students", Key: { StudentId: id } })
    )
  );

  const students = await Promise.all(studentPromises);
  console.log(students.map((s) => s.Item));
}

//
// Function: getBooksForStudent
// Description: Get all books associated with the classes a student is enrolled in.
//
async function getBooksForStudent(studentId) {
  // Step 1: Get all class enrollments for the student
  const enrollments = await docClient.send(
    new ScanCommand({
      TableName: "StudentClassEnrollments",
      FilterExpression: "StudentId = :sid",
      ExpressionAttributeValues: { ":sid": studentId },
    })
  );

  const classIds = enrollments.Items.map((e) => e.ClassId);

  // Step 2: Get book assignments for the classes
  const bookAssignments = await docClient.send(
    new ScanCommand({
      TableName: "ClassBookAssignments",
      FilterExpression:
        "ClassId IN (" + classIds.map((_, i) => `:cls${i}`).join(", ") + ")",
      ExpressionAttributeValues: classIds.reduce((acc, id, i) => {
        acc[`:cls${i}`] = id;
        return acc;
      }, {}),
    })
  );

  // Step 3: Remove duplicate BookIds
  const bookIds = [...new Set(bookAssignments.Items.map((b) => b.BookId))];

  // Step 4: Fetch full book records
  const bookPromises = bookIds.map((bookId) =>
    docClient.send(
      new GetCommand({ TableName: "Books", Key: { BookId: bookId } })
    )
  );

  const books = await Promise.all(bookPromises);
  console.log(books.map((b) => b.Item));
}

//
// Function: countBookUsageAcrossClasses
// Description: Count how many classes each book is used in and print the results.
//
async function countBookUsageAcrossClasses() {
  // Step 1: Get all book assignments
  const result = await docClient.send(
    new ScanCommand({
      TableName: "ClassBookAssignments",
    })
  );

  const usageMap = {};

  // Step 2: Build a map of BookId -> usage count
  result.Items.forEach((b) => {
    usageMap[b.BookId] = (usageMap[b.BookId] || 0) + 1;
  });

  // Step 3: Fetch and print book details along with usage count
  for (const [bookId, count] of Object.entries(usageMap)) {
    const book = await docClient.send(
      new GetCommand({ TableName: "Books", Key: { BookId: bookId } })
    );
    console.log(`${book.Item.Title} ID ${bookId} used in ${count} class(es)`);
  }
}

// 🟡 Sample invocations for testing (uncomment one at a time as needed)

// countBookUsageAcrossClasses();
// getBooksForStudent("STU003");
// getSpring2025EnrolledStudents();
// getStudentsByClassId("CLS005");
// getStudentById("STU038");
// getStudentsBornAfter("2005-01-01");
// getBookById("BK023");
