const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3306;

const db = new sqlite3.Database('loja');

app.get('/jogos', (req, res) => {
  db.all('SELECT * FROM jogos', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.post('/login', express.json(), (req, res) => {
  const { email, password } = req.body;

  // Lógica de autenticação básica
  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, password], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (row) {
      res.json({ success: true, message: `Bem-vindo, ${row.nome}!` });
    } else {
      res.json({ success: false, message: 'Credenciais inválidas.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${3306}`);
});
