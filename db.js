const {Pool} = require('pg');

const pool = new Pool({
    user: 'zacheidenberger',
    host: 'localhost',
    database: 'zacheidenberger',
    password:'',
    port: 5432
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database:', res.rows[0].now);
    }
  });

  // Handle errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
    process.exit(-1); // Exit the process with an error code
  });
  
  // Close the connection pool when the application exits
  process.on('SIGINT', () => {
    pool.end(); // Close all connections in the pool
    console.log('Connection pool closed');
    process.exit(0); // Exit the process successfully
  });
  
  
  // Export the pool object so it can be used in other files
  module.exports = pool;
