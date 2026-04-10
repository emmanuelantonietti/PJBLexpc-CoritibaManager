const db = require('../config/db');

exports.listarTodos = (req, res) => {
  db.query('SELECT * FROM jogadores', (err, results) => {
    if (err) {
      console.error("ERRO GRAVE NO BANCO:", err);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
};

exports.buscarPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM jogadores WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (results.length === 0) return res.status(404).json({ mensagem: 'Jogador não encontrado' });
    res.json(results[0]);
  });
};

// CRIAR JOGADOR (POST)
exports.criar = (req, res) => {
  console.log("➡️ DADOS RECEBIDOS DO FRONTEND:", req.body); 

  const { nome, posicao, numero_camisa, data_nascimento, pe_dominante } = req.body;
  
  if (!nome || !posicao || !numero_camisa) {
    console.log("❌ ERRO: Faltou preencher algum campo obrigatório.");
    return res.status(400).json({ erro: 'Nome, posição e número são obrigatórios.' });
  }

  const query = 'INSERT INTO jogadores (nome, posicao, numero_camisa, data_nascimento, pe_dominante) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [nome, posicao, numero_camisa, data_nascimento, pe_dominante], (err, results) => {
    if (err) {
      console.error("❌ ERRO DO MYSQL:", err.message); 
      return res.status(500).json({ erro: err.message });
    }
    

    console.log("✅ SUCESSO! Jogador salvo com ID:", results.insertId);
    res.status(201).json({ mensagem: 'Jogador criado com sucesso!', id: results.insertId });
  });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { nome, posicao, numero_camisa, data_nascimento, pe_dominante } = req.body;
  
  const query = 'UPDATE jogadores SET nome=?, posicao=?, numero_camisa=?, data_nascimento=?, pe_dominante=? WHERE id=?';
  db.query(query, [nome, posicao, numero_camisa, data_nascimento, pe_dominante, id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Jogador atualizado com sucesso!' });
  });
};

exports.deletar = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM jogadores WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Jogador deletado com sucesso!' });
  });
};