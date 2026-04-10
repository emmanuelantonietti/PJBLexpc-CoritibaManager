import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Jogadores.css';

export default function Jogadores() {
  const navigate = useNavigate();
  const [jogadores, setJogadores] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [posicao, setPosicao] = useState('');
  const [numeroCamisa, setNumeroCamisa] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [peDominante, setPeDominante] = useState('');

  useEffect(() => {
    carregarJogadores();
  }, []);

  const carregarJogadores = async () => {
    try {
      const response = await api.get('/jogadores');
      setJogadores(response.data);
    } catch (error) {
      setMensagem("Erro ao carregar lista de jogadores.");
    }
  };

  const prepararEdicao = (jogador) => {
    setIdEdicao(jogador.id);
    setNome(jogador.nome);
    setPosicao(jogador.posicao);
    setNumeroCamisa(jogador.numero_camisa);
    const dataFormatada = jogador.data_nascimento ? jogador.data_nascimento.split('T')[0] : '';
    setDataNascimento(dataFormatada);
    setPeDominante(jogador.pe_dominante);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparCampos = () => {
    setIdEdicao(null);
    setNome('');
    setPosicao('');
    setNumeroCamisa('');
    setDataNascimento('');
    setPeDominante('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dadosJogador = {
      nome,
      posicao,
      numero_camisa: parseInt(numeroCamisa),
      data_nascimento: dataNascimento,
      pe_dominante: peDominante
    };

    try {
      if (idEdicao) {
        await api.put(`/jogadores/${idEdicao}`, dadosJogador);
        setMensagem('Jogador atualizado com sucesso!');
      } else {
        await api.post('/jogadores', dadosJogador);
        setMensagem('Jogador cadastrado com sucesso!');
      }

      limparCampos();
      carregarJogadores();
      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      const msgErro = error.response?.data?.erro || "Erro na operação.";
      setMensagem(`Erro: ${msgErro}`);
    }
  };


  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este jogador?')) {
      try {
        await api.delete(`/jogadores/${id}`);
        setMensagem('Jogador removido!');
        carregarJogadores();
        setTimeout(() => setMensagem(''), 3000);
      } catch (error) {
        setMensagem("Erro ao excluir jogador.");
      }
    }
  };

  return (
    <div className="jogadores-container">
      <h2 className="jogadores-title">
        {idEdicao ? 'Editar Registro de Atleta' : 'Gerenciar Elenco'}
      </h2>
      
      {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}

      <form onSubmit={handleSubmit} className="form-crud">
        <h3>{idEdicao ? `Editando: ${nome}` : 'Novo Cadastro'}</h3>
        
        <input 
          type="text" 
          placeholder="Nome Completo" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="Posição (Ex: Lateral Esquerdo)" 
          value={posicao} 
          onChange={e => setPosicao(e.target.value)} 
          required 
        />
        
        <input 
          type="number" 
          placeholder="Nº da Camisa" 
          value={numeroCamisa} 
          onChange={e => setNumeroCamisa(e.target.value)} 
          required 
        />
        
        <input 
          type="date" 
          value={dataNascimento} 
          onChange={e => setDataNascimento(e.target.value)} 
          required 
        />
        
        <select 
          value={peDominante} 
          onChange={e => setPeDominante(e.target.value)} 
          required
        >
          <option value="">Selecione o Pé Dominante</option>
          <option value="Destro">Destro</option>
          <option value="Canhoto">Canhoto</option>
          <option value="Ambidestro">Ambidestro</option>
        </select>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn-salvar">
            {idEdicao ? 'Salvar Alterações' : 'Cadastrar Atleta'}
          </button>
          
          {idEdicao && (
            <button type="button" className="btn-voltar" onClick={limparCampos}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3 style={{ marginTop: '20px', color: '#00544d' }}>Lista de Jogadores</h3>
      <table className="tabela-jogadores">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Posição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogadores.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhum jogador encontrado.</td></tr>
          ) : (
            jogadores.map(jog => (
              <tr key={jog.id}>
                <td>{jog.nome}</td>
                <td>{jog.posicao}</td>
                <td className="acoes-td">
                  <button onClick={() => navigate(`/detalhes/${jog.id}`)} className="btn-detalhes">Ver Ficha</button>
                  <button onClick={() => prepararEdicao(jog)} className="btn-detalhes" style={{ backgroundColor: '#f0ad4e' }}>Editar</button>
                  <button onClick={() => handleExcluir(jog.id)} className="btn-excluir">Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}