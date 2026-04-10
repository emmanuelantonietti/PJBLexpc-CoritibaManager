import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Escalacao from './pages/Escalacao/Escalacao';
import Jogadores from './pages/Jogadores/Jogadores';
import Detalhes from './pages/Detalhes/Detalhes';
import Partidas from './pages/Partidas/partidas';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <header className="navbar">
          <div className="nav-brand">Coritiba Manager</div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/escalacao">Escalação</Link>
            <Link to="/partidas">Partidas</Link>
            <Link to="/jogadores">Gerenciar</Link>
          </nav>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/escalacao" element={<Escalacao />} />
            <Route path="/partidas" element={<Partidas />} />
            <Route path="/jogadores" element={<Jogadores />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Desenvolvido por: <strong>Emmanuel Antonietti Ribeiro dos Santos</strong></p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;