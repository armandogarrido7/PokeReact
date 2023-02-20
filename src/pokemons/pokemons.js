import PokemonDiv from '../pokemon/pokemon';
import { useState, useEffect } from 'react';

function Pokemons(){
    const [nextURL, setNextURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=8");
    const [pokemonsData, setPokemonsData] = useState([]);
    
    useEffect(() => { getPokemons() }, [])

    function getPokemons(){
        fetch(nextURL)
        .then((response) => response.json())  
        .then((data) => {
            setPokemonsData(pokemonsData.concat(data.results));
            setNextURL(data.next)
        });
    };
    return(
    <div className="p-5 bg-dark">
        <div className="row gy-4">
            {
            pokemonsData.map((pokemon) => (  
            <PokemonDiv key={pokemon.name} pokemonURL={pokemon.url} />
            ))
            } 
        </div>
        <button className="btn btn-primary mt-5 mb-3" onClick={getPokemons}>Load More Pokemons</button>
    </div>
    );
}

export default Pokemons;