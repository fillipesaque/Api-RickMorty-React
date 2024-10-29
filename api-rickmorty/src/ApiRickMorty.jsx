import React, { useEffect, useState } from "react";
import Axios from "axios";

const Api = () => {
  const [character, setCharacter] = useState([]);
  const [singleCharacter, setSingleCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");

  const fetchCharacter = () => {
    if (!id) return; 

    setLoading(true);
    setError(null);

    Axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setSingleCharacter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    Axios.get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacter(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

  }, []);

  if (loading) return <p> Loading ...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="container-pai">
      <h1 className="title">Rick and Morty Characters</h1>

      <input className="input"
        type="number"
        placeholder="Digite Um Id 0 - 800"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button className="btn" onClick={fetchCharacter}>Search</button>

      {singleCharacter ? (
        <div className="card">
          <h2>{singleCharacter.name}</h2>
          <p>Origin: {singleCharacter.origin.name}</p>
          <p>Gender: {singleCharacter.gender}</p>
          <p>Location: {singleCharacter.location.name}</p>
          <p>Species: {singleCharacter.species}</p>
          <img src={singleCharacter.image} alt={singleCharacter.name} />
        </div>
      ) : (
        <div className="cards">
          {character.map((character) => (
            <div key={character.id} className="card">
              <h2>{character.name}</h2>
              <p>Origin: {character.origin.name}</p>
              <p>Gender: {character.gender}</p>
              <p>Location: {character.location.name}</p>
              <p>Species: {character.species}</p>
              <img src={character.image} alt={character.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Api;
