const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

db.run(`
  UPDATE users SET name = 'Jane Doe' WHERE email = 'john@example.com';
`, function(erro){
  if(erro){
    console.error('ERRO ao atualizar a tabela: ', erro.message );
  } else{
    console.error(`Rows (linhas) Update ${this.changes}`)
  }
  db.close();
});

