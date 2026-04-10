import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Detalhes.css';

export default function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogador, setJogador] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const response = await api.get(`/jogadores/${id}`);
        setJogador(response.data);
      } catch (err) {
        setErro("Não foi possível carregar os detalhes do jogador.");
      }
    };
    buscarDetalhes();
  }, [id]);

  if (erro) return <div className="page-content"><p>{erro}</p><button onClick={() => navigate(-1)}>Voltar</button></div>;
  if (!jogador) return <div className="page-content"><p>Carregando ficha técnica...</p></div>;

  return (
    <div className="detalhes-container">
      <h2 className="detalhes-title">Ficha Técnica do Atleta</h2>
      
      <div className="ficha-tecnica">
        <div className="ficha-header">
          <h3>{jogador.nome}</h3>
          <span className="status-ativo">Número {jogador.numero_camisa}</span>
        </div>
        
        <div className="ficha-body">
          <p><strong>Posição:</strong> {jogador.posicao}</p>
          <p><strong>Pé Dominante:</strong> {jogador.pe_dominante}</p>
          <p><strong>Data de Nascimento:</strong> {new Date(jogador.data_nascimento).toLocaleDateString('pt-BR')}</p>
          <p><strong>Identificador Interno:</strong> #{jogador.id}</p>
        </div>

        <button className="btn-voltar" onClick={() => navigate(-1)}>
          &larr; Voltar para a Gestão
        </button>
      </div>
    </div>
  );
}