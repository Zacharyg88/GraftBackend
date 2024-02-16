const pool = require('./db');

// Function to create a user
async function createUser(id, username, email, password, firstname, lastname, birthday, address, phonenumber, biography) {
    try {
      // Query to insert a new user into the database
      const query = 'INSERT INTO users (id, username, email, password, firstname, lastname, birthday, address, phonenumber, biography) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      
      // Execute the query with parameters
      const { rows } = await pool.query(query, [id, username, email, password, firstname, lastname, birthday, address, phonenumber, biography]);
      
      // Return the created user
      return rows[0];
    } catch (error) {
      // Handle errors
      console.error('Error creating user:', error);
      throw error;
    }
  };

  async function retrieveUserByID(userId) {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [userId])
        return rows[0]
    } catch (error) {
        console.error('Error retreiving user by ID:', error)
        throw error
    }
  };

  async function emailIsTaken(email) {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const  { rows } = await pool.query(query, [email])
        return rows.length === 0
    } catch (error) {
        console.error('Error checking if email is taken:', error)
        throw error
    }
  };

  module.exports = {
    createUser,
    retrieveUserByID,
    emailIsTaken
  };