import * as SQLite from 'expo-sqlite';

const initializeDatabase = async () => {
  try {
    // Open or create a database
    const db = await SQLite.openDatabaseAsync('users.db');

    // Set journal mode and create a table if it doesn't exist
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        address TEXT,
        cellphone TEXT,
        email TEXT NOT NULL
      );
    `);
    console.log('Database initialized successfully.');

    // Insert sample data
    await db.execAsync(`
      INSERT INTO users (name, surname, address, cellphone, email) 
      VALUES 
        ('John', 'Doe', '123 Main St', '123-456-7890', 'john.doe@example.com'),
        ('Jane', 'Smith', '456 Elm St', '987-654-3210', 'jane.smith@example.com');
    `);
    console.log('Sample data inserted.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

const insertUser = async (name, surname, address, cellphone, email) => {
  try {
    const db = await SQLite.openDatabaseAsync('users.db');
    const result = await db.runAsync(
      'INSERT INTO users (name, surname, address, cellphone, email) VALUES (?, ?, ?, ?, ?)',
      name,
      surname,
      address,
      cellphone,
      email
    );
    console.log('User inserted with ID:', result.lastInsertRowId);
  } catch (error) {
    console.error('Error inserting user:', error);
  }
};

const fetchUsers = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('users.db');
    const users = await db.getAllAsync('SELECT * FROM users');
    console.log('Fetched users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const updateUser = async (id, name, surname, address, cellphone, email) => {
  try {
    const db = await SQLite.openDatabaseAsync('users.db');
    await db.runAsync(
      'UPDATE users SET name = ?, surname = ?, address = ?, cellphone = ?, email = ? WHERE id = ?',
      name,
      surname,
      address,
      cellphone,
      email,
      id
    );
    console.log('User updated successfully.');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUser = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync('users.db');
    await db.runAsync('DELETE FROM users WHERE id = ?', id);
    console.log('User deleted successfully.');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export default {
  initializeDatabase,
  insertUser,
  fetchUsers,
  updateUser,
  deleteUser,
};
