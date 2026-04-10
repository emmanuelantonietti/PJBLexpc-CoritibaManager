const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Emano17#', 
    database: 'coritibateam' 
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar no banco de dados:', erro);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

module.exports = conexao;