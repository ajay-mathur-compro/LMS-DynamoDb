const docClient = require("../dynamoClient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const books = [
  {
    BookId: "BK021",
    Title: "Data Structures",
    Author: "Mason Wilson",
    ISBN: "978-6506029553",
    Publisher: "Pearson",
    PublicationYear: "2018",
  },
  {
    BookId: "BK022",
    Title: "Organic Chemistry",
    Author: "Olivia Davis",
    ISBN: "978-5333949810",
    Publisher: "Pearson",
    PublicationYear: "2023",
  },
  {
    BookId: "BK023",
    Title: "Linear Algebra",
    Author: "Liam Johnson",
    ISBN: "978-2212560705",
    Publisher: "McGraw-Hill",
    PublicationYear: "2020",
  },
  {
    BookId: "BK024",
    Title: "World History",
    Author: "Liam Wilson",
    ISBN: "978-9421657946",
    Publisher: "Pearson",
    PublicationYear: "2017",
  },
  {
    BookId: "BK025",
    Title: "British Literature",
    Author: "Mason Taylor",
    ISBN: "978-6809630133",
    Publisher: "Cengage Learning",
    PublicationYear: "2015",
  },
  {
    BookId: "BK026",
    Title: "Organic Chemistry",
    Author: "Mason Taylor",
    ISBN: "978-6476942877",
    Publisher: "McGraw-Hill",
    PublicationYear: "2009",
  },
  {
    BookId: "BK027",
    Title: "Calculus: Early Transcendentals",
    Author: "Alex Miller",
    ISBN: "978-7094006562",
    Publisher: "Pearson",
    PublicationYear: "2019",
  },
  {
    BookId: "BK028",
    Title: "Organic Chemistry",
    Author: "Liam Miller",
    ISBN: "978-7712438700",
    Publisher: "McGraw-Hill",
    PublicationYear: "2003",
  },
  {
    BookId: "BK029",
    Title: "Organic Chemistry",
    Author: "Chris Doe",
    ISBN: "978-4903197667",
    Publisher: "Cengage Learning",
    PublicationYear: "2016",
  },
  {
    BookId: "BK030",
    Title: "Organic Chemistry",
    Author: "Emma Taylor",
    ISBN: "978-6806571419",
    Publisher: "Cengage Learning",
    PublicationYear: "2016",
  },
];

async function addBooks() {
  for (const book of books) {
    const input = {
      TableName: "Books",
      Item: book,
    };

    try {
      const command = new PutCommand(input);
      await docClient.send(command);
      console.log(` Added ${book.Title}`);
    } catch (err) {
      console.error(`Error adding ${book.Title}:`, err);
    }
  }
}

addBooks();
