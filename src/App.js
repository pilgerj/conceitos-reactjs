import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  async function handleAddRepository() {
    
    const newRepository = {
      title: `Repositorio ${Date.now()}`,
      url: `URL: ${Date.now()}`,
      techs: []
    }
    
    api.post('/repositories', newRepository).then(response => {
          setRepositories([...repositories, response.data])
        }
    )
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(rep => rep.id === id);

    repositories.splice(repositoryIndex, 1);

    api.delete(`/repositories/${id}`).then( response => {
      setRepositories([...repositories]) }
    )
  }

  function handleLikeLike(id){
    const repositoryIndex = repositories.findIndex(rep => rep.id === id);
    api.post(`/repositories/${id}/like`).then(response => {
      repositories[repositoryIndex].likes = response.data.likes;
      setRepositories([...repositories]);
    })

  }

  useEffect( () => {
    api.get('/repositories').then( response => {
      setRepositories(response.data)
    });
  }, []);

  return (
    <div>  
      <ul data-testid="repository-list">
        {repositories.map( rep => 
          <li key={rep.id}> 
            <h2>
              {rep.title}
            </h2>
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
            <button id='like' onClick={() => handleLikeLike(rep.id)}>
              LikeLike
            </button>
          </li> )}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
/** */
export default App;
