import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoCoxa from '../../assets/Logo-coxa.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', marginTop: '50px' }}>
      <img 
        src={LogoCoxa} 
        alt="Logo Coritiba" 
        style={{ width: '250px', marginBottom: '20px', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))' }} 
      />
      <h1 style={{ color: '#00544d', fontSize: '3rem', margin: '0' }}>Coritiba Manager</h1>
      <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '20px' }}>
        Comece agora o projeto de manager do Verdão!
      </p>
      
      <button 
        onClick={() => navigate('/escalacao')}
        style={{ padding: '12px 24px', backgroundColor: '#00544d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
      >
        Começar Agora
      </button>
    </div>
  );
}