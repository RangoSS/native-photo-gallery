import userDatabase from '../../components/SQLiteConnection';

const testDatabase = async () => {
  await userDatabase.initializeDatabase();

  // Insert a new user
  await userDatabase.insertUser(
    'Alice',
    'Wonderland',
    '789 Maple Rd',
    '555-1234',
    'alice@example.com'
  );

  // Fetch all users
  const users = await userDatabase.fetchUsers();
  console.log(users);
{/*  
  // Update a user
  await userDatabase.updateUser(
    users[0].id,
    'John',
    'Doe',
    'Updated Address',
    'Updated Phone',
    'updated.email@example.com'
  );
  */}
  // Delete a user
  //await userDatabase.deleteUser(users[1].id);
};

testDatabase();
