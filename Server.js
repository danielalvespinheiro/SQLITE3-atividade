const express = require("express");
const sqlite3 = require("sqlite3");
const port = 3031;
const app = express();
const db = new sqlite3.Database('MeuDB');

app.use(express.json());

app.get('/criar-tabel', (req, res) =>{
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        nome TEXT,
        email TEXT,
        senha TEXT
        )
        `, (err) =>{
            if(err){
                return res.status(500).send("Erro ao criar a tabela: " + err.message);
            } else{
                res.send('tabela criada (ou já existe)');
            }
        });
        db.close();
})

app.post('/inserirNaTable', (req, res) => {
    const { nome, email, senha } = req.body;
    db.run(`
    INSERT INTO users (nome, email, senha)
    VALUES (?, ?, ?)
    `, [nome, email, senha], function(err){
        if (err) {
            return res.status(500).send("Erro ao inserir usuário: " + err.message);
        }
        res.send(`Usuário inserido com sucesso, ID: ${this.lastID}`);
    });
    db.close();
});

// Listar usuários
app.get('/listar', (req, res) => {
    db.all(`
    SELECT * FROM users
    `, (err, rows) => {
        if (err) {
            return res.status(500).send("Erro ao listar usuários: " + err.message);
        }
        res.json(rows);
    });
    db.close();
});

// Atualizar nome
app.post('/atualizarNome', (req, res) => {
    const { nome, email } = req.body;
    db.run(`
    UPDATE users SET nome = ? WHERE email = ?
    `, [nome, email], function(err){
        if (err) {
            return res.status(500).send("Erro ao atualizar nome: " + err.message);
        }
        res.send(`Nome atualizado com sucesso. ${this.changes} linha(s) afetada(s)`);
    });
    db.close();
});

// Atualizar email
app.post('/atualizarEmail', (req, res) => {
    const { email, senha } = req.body;
    db.run(`
    UPDATE users SET email = ? WHERE senha = ?
    `, [email, senha], function(err){
        if (err) {
            return res.status(500).send("Erro ao atualizar email: " + err.message);
        }
        res.send(`Email atualizado com sucesso. ${this.changes} linha(s) afetada(s)`);
    });
    db.close();
});

// Apagar usuário
app.post('/apagar', (req, res) => {
    const { email, senha } = req.body;
    db.run(`
    DELETE FROM users WHERE email = ? AND senha = ?
    `, [email, senha], function(err){
        if (err) {
            return res.status(500).send("Erro ao deletar usuário: " + err.message);
        }
        res.send(`Usuário deletado com sucesso. ${this.changes} linha(s) afetada(s)`);
    });
    db.close();
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});