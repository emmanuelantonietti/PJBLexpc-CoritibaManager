const db = require('../config/db');

exports.listarTodas = (req, res) => {
  db.query('SELECT * FROM partidas ORDER BY data_hora DESC', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

exports.criar = (req, res) => {
  const { data_hora, adversario, estadio, placar_nosso, placar_deles, status } = req.body;
  if (!data_hora || !adversario || !estadio) return res.status(400).json({ erro: 'Data, adversário e estádio são obrigatórios.' });

  const query = 'INSERT INTO partidas (data_hora, adversario, estadio, placar_nosso, placar_deles, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [data_hora, adversario, estadio, placar_nosso || 0, placar_deles || 0, status || 'Agendado'], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ mensagem: 'Partida agendada!', id: results.insertId });
  });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { data_hora, adversario, estadio, placar_nosso, placar_deles, status } = req.body;
  
  const query = 'UPDATE partidas SET data_hora=?, adversario=?, estadio=?, placar_nosso=?, placar_deles=?, status=? WHERE id=?';
  db.query(query, [data_hora, adversario, estadio, placar_nosso, placar_deles, status, id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Partida atualizada!' });
  });
};

exports.deletar = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM partidas WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Partida cancelada/removida!' });
  });
};