import { useState, useEffect } from 'react';
import Personagem from "./Personagem.jsx";

const Personagens = () => {
  const [personagens, setPersonagens] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [pesquisa, setPesquisa] = useState('');  
  const [personagemSelecionado, setPersonagemSelecionado] = useState('');

  useEffect(() => { 
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setPersonagens(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, [])

  const personagensFiltrados = personagens.filter((personagem) => {
    if (filtroStatus === '') {
      return true;
    }
    return personagem.status.toLowerCase() === filtroStatus.toLowerCase();
  });

  const pesquisar = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${pesquisa}`);
      const data = await response.json();
      setPersonagens(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  
  const mudarFiltro = (event) => {
    setFiltroStatus(event.target.value);
  };

  const ouvir = (id) => {
    selecionarPersonagem(id)
  }

  const selecionarPersonagem = async (id) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      setPersonagemSelecionado(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Rick and Morty App</h1>
      <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
      <button onClick={pesquisar}>Pesquisar</button>
      <select value={filtroStatus} onChange={mudarFiltro}>
        <option value="">Todos</option>
        <option value="alive">Vivo</option>
        <option value="dead">Morto</option>
        <option value="unknown">Desconhecido</option>
      </select>
      <div className="container-personagem">
        <div className="personagem-left">
          {personagensFiltrados.length > 0 && personagensFiltrados.map((personagem, index) => (
              <Personagem onPersonagemClick={ouvir} key={index} personagem={personagem} />
            ))
          }
        </div>
        {personagemSelecionado && (
          <div className="personagem-right">
            <h2>Detalhes do Personagem</h2>
            <img className="img-right" src={personagemSelecionado.image} alt={personagemSelecionado.name} />
            <p>Nome: {personagemSelecionado.name}</p>
            <p>Status: {personagemSelecionado.status}</p>
            <p>Espécie: {personagemSelecionado.species}</p>

            {/* <h3>Episódios:</h3>
            <ul>
              {episodes.map((episode) => (
                <li key={episode.id}>
                  <p>Número: {episode.episode}</p>
                  <p>Título: {episode.name}</p>
                </li>
              ))}
            </ul> */}
          </div>
        )}
        
      </div>
    </>
  );
};

export default Personagens;
