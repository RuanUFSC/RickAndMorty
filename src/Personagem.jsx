import { useState } from 'react'
import './App.css'
import './Personagem.css'

function Personagem(props) {

  const personagem = props.personagem;

  const selecionarPersonagem = async (id) => {
    try {
      props.onPersonagemClick(id);
      // const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      // const data = await response.json();
      // setPersonagemSelecionado(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>              
      <div  key={personagem.id} className="container-personagem" onClick={() => selecionarPersonagem(personagem.id)}>
        <img className="img-right" src={personagem.image} alt={personagem.name} />
        <div className="container-personagem-data">
          <p>Nome: {personagem.name}</p>
          <p>Status: {personagem.status}</p>
        </div>
      </div>
      
    </>
  )
}

export default Personagem
