import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setURl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get("repositories");
        setRepositories(response.data);
      } catch (err) {
        alert("Não foi possível carregar repositórios");
      }
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const repository = { title, url, techs: techs.split(",") };
      const response = await api.post("repositories", repository);
      setRepositories([...respositories, response.data]);
    } catch (err) {
      alert("Não foi possível adicionar repositório");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      setRepositories(respositories.filter((r) => r.id !== id));
    } catch (err) {
      alert("Não foi possível remover repositório");
    }
  }

  return (
    <div className="container">
      <h1>Desafio 03: Conceitos do ReactJS</h1>
      <div className="add">
        <input
          placeholder="Title (Desafio ReactJS)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          placeholder="Url (https://github.com/josepholiveira)"
          value={url}
          onChange={(e) => {
            setURl(e.target.value);
          }}
        ></input>
        <input
          placeholder="Techs (React, Node.js)"
          value={techs}
          onChange={(e) => {
            setTechs(e.target.value);
          }}
        ></input>
        <button className="button-block" onClick={handleAddRepository}>
          Adicionar
        </button>
      </div>
      <ul data-testid="repository-list" className="list-repositories">
        {respositories.map((r) => (
          <li key={r.id} className="repository">
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
