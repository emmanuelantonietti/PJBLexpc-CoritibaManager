const express = require('express');
const cors = require('cors');
const jogadoresRoutes = require('./routes/jogadoresRoutes');
const comissaoRoutes = require('./routes/comissaoRoutes');
const partidasRoutes = require('./routes/partidasRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/jogadores', jogadoresRoutes);
app.use('/api/comissao', comissaoRoutes);
app.use('/api/partidas', partidasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});