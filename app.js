// const express = require('express');
// const { Pool } = require('pg');

// const app = express();
// const PORT = process.env.PORT || 4400;

// // Configure PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'Admin@123',
//   port: 5432
// });

// // Define a basic route
// app.get('/', (req, res) => {
//   pool.query('SELECT $1::text as message', ['Hello, Node.js with PostgreSQL!'], (error, result) => {
//     if (error) {
//       console.error('Error executing query', error);
//       res.status(500).json({ error: 'An error occurred' });
//     } else {
//       const message = result.rows[0].message;
//       res.status(200).json({ message });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4400;

const itemsRouter = require('./routes/items');

app.use(bodyParser.json());

app.use('/api', itemsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
