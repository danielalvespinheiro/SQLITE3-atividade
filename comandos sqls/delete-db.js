const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

db.run(`
  DELETE FROM users WHERE email = 'john@example.com';
`, function(erro){
  if(erro){
    console.error('ERRO ao deletar a tabela: ', erro.message );
  } else{
    console.error(`Rows (linhas) Delete ${this.changes}`)
  }
  db.close();
});