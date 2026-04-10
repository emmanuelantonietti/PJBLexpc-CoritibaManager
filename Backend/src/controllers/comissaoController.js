const db = require('../config/db');

exports.listarTodos = (req, res) => {
  db.query('SELECT * FROM comissao_tecnica', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

exports.criar = (req, res) => {
  const { nome, cargo } = req.body;
  if (!nome || !cargo) return res.status(400).json({ erro: 'Nome e cargo são obrigatórios.' });

  db.query('INSERT INTO comissao_tecnica (nome, cargo) VALUES (?, ?)', [nome, cargo], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ mensagem: 'Membro da comissão cadastrado!', id: results.insertId });
  });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { nome, cargo } = req.body;
  db.query('UPDATE comissao_tecnica SET nome=?, cargo=? WHERE id=?', [nome, cargo, id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Comissão atualizada!' });
  });
};

exports.deletar = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM comissao_tecnica WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Membro removido da comissão!' });
  });
};