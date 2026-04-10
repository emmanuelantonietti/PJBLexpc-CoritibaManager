import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Escalacao.css';

export default function Escalacao() {
  const [titulares, setTitulares] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [comissao, setComissao] = useState([]);

  useEffect(() => {
    api.get('/jogadores')
      .then(res => {
        setTitulares(res.data.slice(0, 11));
        setReservas(res.data.slice(11));
      })
      .catch(err => console.error("Erro ao carregar jogadores", err));

    api.get('/comissao')
      .then(res => setComissao(res.data))
      .catch(err => console.error("Erro ao carregar comissão", err));
  }, []);

  const obterPosicaoCSS = (index) => {
    const posicoes = [
      { top: '85%', left: '50%' }, // 0: Goleiro
      { top: '70%', left: '15%' }, // 1: Lateral Esquerdo
      { top: '70%', left: '38%' }, // 2: Zagueiro 1
      { top: '70%', left: '62%' }, // 3: Zagueiro 2
      { top: '70%', left: '85%' }, // 4: Lateral Direito
      { top: '45%', left: '30%' }, // 5: Meia Esquerda
      { top: '50%', left: '50%' }, // 6: Volante Central
      { top: '45%', left: '70%' }, // 7: Meia Direita
      { top: '20%', left: '20%' }, // 8: Ponta Esquerda
      { top: '15%', left: '50%' }, // 9: Centroavante
      { top: '20%', left: '80%' }, // 10: Ponta Direita
    ];
    return posicoes[index] || { display: 'none' };
  };

  return (
    <div className="escalacao-layout">
      <div className="coluna-campo">
        <h2 className="escalacao-title">Escalação do Verdão</h2>
        <div className="campo-futebol">
          <div className="linha-meio"></div>
          {titulares.map((jog, index) => (
            <div key={jog.id} className="jogador-marcador" style={obterPosicaoCSS(index)}>
              <div className="jogador-numero">{jog.numero_camisa}</div>
              <span className="jogador-nome-campo">{jog.nome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="coluna-lateral">
        <div className="card-lista">
          <h3>Reservas</h3>
          <ul className="lista-simples">
            {reservas.length > 0 ? reservas.map(jog => (
              <li key={jog.id}>
                <span className="num">{jog.numero_camisa}</span> {jog.nome} 
                <small>({jog.posicao})</small>
              </li>
            )) : <li>Nenhum reserva</li>}
          </ul>
        </div>

        <div className="card-lista" style={{ marginTop: '20px' }}>
          <h3>Comissão Técnica</h3>
          <ul className="lista-simples">
            {comissao.map(membro => (
              <li key={membro.id}>
                <strong>{membro.cargo}:</strong> {membro.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}