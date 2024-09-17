const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('meudb.db');

//criarTable();
//inserirNaTable("Daniel", "@Lula2025", "brasuxa 2023");
//listar();
//atualizarNome("Eliel Alves", "@Lula2025");
//atualizarEmail("@NovoEmail", "brasuxa 2023");
//apagar("@NovoEmail", "brasuxa 2023");

function criarTable(){
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    email TEXT,
    senha TEXT
    )
    `);
    db.close();
}

function inserirNaTable(nome, email, senha){
    db.run(`
    INSERT INTO users (nome, email, senha)
    VALUES (?, ?, ?)
    `, [nome, email, senha], function(err){
        if(err){
            console.error("Erro ao cadastrar usuários: ", err.message);
        } else{
            console.log(`Rows cadastradas: ${this.changes}`);
        }
        db.close();
    });
}

function listar(){
    db.all(`
    SELECT * FROM users
    `, function(err, rows){
        if(err){
            console.error("Erro ao listar a tabela: ", err.message);
        } else{
            console.log('Rows listadas: ', rows)
        }
        db.close();
    });
}

function atualizarNome(nome, email){
    db.run(`
    UPDATE users SET nome = ? WHERE email = ?;    
    `, [nome, email], function(err){
        if(err){
            console.error("Erro ao atualizar a tabela: ", err.message);
        } else{
            console.log(`Rows atualizadas: ${this.changes}`)
        }
        db.close();
    });
}

function atualizarEmail(email, senha){
    db.run(`
    UPDATE users SET email = ? WHERE senha = ?;    
    `, [email, senha], function(err){
        if(err){
            console.error("Erro ao atualizar a tabela: ", err.message);
        } else{
            console.log(`Rows atualizadas: ${this.changes}`)
        }
        db.close();
    });
}

function apagar(email, senha){
    db.run(`
    DELETE FROM users WHERE email = ? AND senha = ?;
    `, [email, senha] ,function(err){
        if(err){
            console.error("Erro ao deletar a tabela: ", err.message);
        } else{
            console.log(`Rows deletadas: ${this.changes}`)
        }
        db.close();
    });
}

