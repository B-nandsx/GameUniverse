const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3305;

// Configuração do MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "acesso123",
  database: "loja",
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    throw err;
  }
  console.log("Conectado ao banco de dados MySQL");
});

// Configuração do Express para usar o body-parser e cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/cadastrar", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  // Lógica de validação básica
  if (nome.trim() === "" || email.trim() === "" || senha.trim() === "") {
    return res.status(400).send("Por favor, preencha todos os campos.");
  }

  // Consulta ao banco de dados para cadastrar um novo usuário
  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).send("Erro interno do servidor");
    }

    // Novo usuário cadastrado com sucesso
    return res.status(200).send(`Usuário ${nome} cadastrado com sucesso!`);
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});
