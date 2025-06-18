const docClient = require('./dynamoClient');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');

async function addUser(){
  const input = {
    TableName: 'user',
    Item: {
      userid: 's001',
      name: 'Alice Jain',
      email: 'alice@example.com',
      classId: 'class01',
    },
  };

  try {
    const command = new PutCommand(input);
    await docClient.send(command);
    console.log('✅ Student added successfully!');
  } catch (err) {
    console.error('❌ Error adding student:', err);
  }
}

addUser();
