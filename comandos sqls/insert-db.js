const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

db.run(`
  INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
`);

db.close();