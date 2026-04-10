import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Partidas.css';

export default function Partidas() {
  const [partidas, setPartidas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/partidas')
      .then(res => setPartidas(res.data))
      .catch(err => {
        console.error("Erro ao carregar partidas", err);
        setErro("Não foi possível carregar o calendário de partidas.");
      });
  }, []);

  if (erro) return <div className="page-content"><p>{erro}</p></div>;

  return (
    <div className="partidas-container">
      <h2 className="titulo-verde">Calendário de Partidas - Coritiba</h2>
      
      <div className="grid-partidas">
        {partidas.length > 0 ? partidas.map(partida => (
          

          <div key={partida.id} className="card-partida">
            
            <div className="header-partida">
              <span className="data">
                {new Date(partida.data_hora).toLocaleDateString('pt-BR')}
              </span>
              <span className={`status-badge ${partida.status.toLowerCase()}`}>
                {partida.status}
              </span>
            </div>

            <div className="confronto-area">
              <div className="time">Coritiba</div>
              <div className="placar-box">
                {partida.placar_nosso} - {partida.placar_deles}
              </div>
              <div className="time">{partida.adversario}</div>
            </div>

            <div className="footer-partida">
              <p><span>🏟️</span> {partida.estadio}</p>
              <p><span>⏰</span> {new Date(partida.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            
          </div>
          
        )) : <p className="p-content">Nenhuma partida agendada no momento.</p>}
      </div>
    </div>
  );
}